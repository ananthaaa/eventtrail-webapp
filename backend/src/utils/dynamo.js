/**
 * EventTrail (CampusPulse) — DynamoDB Helper Client
 * Wraps AWS SDK v3 DynamoDB DocumentClient for NoSQL operations.
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { 
    DynamoDBDocumentClient, 
    GetCommand, 
    PutCommand, 
    UpdateCommand, 
    QueryCommand, 
    DeleteCommand 
} = require('@aws-sdk/lib-dynamodb');

const region = process.env.AWS_REGION || 'ap-south-1';
const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
    }
});

/**
 * Increment or decrement an atomic seat counter in DynamoDB.
 * Used in Module 3 to prevent overbooking race conditions.
 * @param {string} eventId - Unique ID of the event
 * @param {number} delta - Positive integer to add, negative integer to subtract
 * @returns {Promise<number>} Updated counter value
 */
async function updateSeatCounter(eventId, delta = 1) {
    const tableName = process.env.SEAT_COUNTERS_TABLE || 'eventtrail-seat-counters-dev';
    const command = new UpdateCommand({
        TableName: tableName,
        Key: { event_id: eventId },
        UpdateExpression: 'ADD seat_count :delta, total_rsvps :abs_delta',
        ExpressionAttributeValues: {
            ':delta': delta,
            ':abs_delta': delta > 0 ? delta : 0
        },
        ReturnValues: 'UPDATED_NEW'
    });

    try {
        const response = await docClient.send(command);
        return response.Attributes ? response.Attributes.seat_count : 0;
    } catch (err) {
        console.error(`[DynamoDB Error] Failed to update seat counter for event ${eventId}:`, err.message);
        throw err;
    }
}

/**
 * Log a sent notification to DynamoDB notifications_log table.
 * Used in Module 4 and displayed in frontend Notification Center.
 */
async function logNotification(userId, notificationType, message, metadata = {}) {
    const tableName = process.env.NOTIFICATIONS_TABLE || 'eventtrail-notifications-log-dev';
    const timestamp = new Date().toISOString();
    const item = {
        user_id: userId,
        timestamp,
        type: notificationType,
        message,
        read: false,
        metadata
    };

    const command = new PutCommand({
        TableName: tableName,
        Item: item
    });

    try {
        await docClient.send(command);
        return item;
    } catch (err) {
        console.error(`[DynamoDB Error] Failed to log notification for user ${userId}:`, err.message);
        throw err;
    }
}

/**
 * Add a user to the event waitlist queue.
 * Used in Module 3 when an event reaches max capacity.
 */
async function addToWaitlist(eventId, userId, position, ttlSeconds = null) {
    const tableName = process.env.WAITLIST_TABLE || 'eventtrail-waitlist-queue-dev';
    const item = {
        event_id: eventId,
        position,
        user_id: userId,
        joined_at: new Date().toISOString()
    };
    if (ttlSeconds) {
        item.ttl = Math.floor(Date.now() / 1000) + ttlSeconds;
    }

    const command = new PutCommand({
        TableName: tableName,
        Item: item
    });

    try {
        await docClient.send(command);
        return item;
    } catch (err) {
        console.error(`[DynamoDB Error] Failed to add user ${userId} to waitlist for event ${eventId}:`, err.message);
        throw err;
    }
}

module.exports = {
    docClient,
    updateSeatCounter,
    logNotification,
    addToWaitlist
};
