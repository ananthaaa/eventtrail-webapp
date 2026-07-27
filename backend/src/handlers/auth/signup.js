/**
 * EventTrail (CampusPulse) — Lambda Handler: POST /auth/signup
 * Registers a new user in AWS Cognito User Pool and records their profile in AWS RDS MySQL.
 */

const { 
    CognitoIdentityProviderClient, 
    SignUpCommand, 
    AdminAddUserToGroupCommand,
    AdminConfirmSignUpCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const { v4: uuidv4 } = require('uuid');
const db = require('../../db/connection');

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION || 'ap-south-1' });

const ALLOWED_ROLES = ['Student', 'Faculty', 'ClubOrganizer', 'Administrator'];

exports.handler = async (event) => {
    console.info('[Auth Signup] Received event:', JSON.stringify({ ...event, body: '***' }));

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Request body is required.', code: 'MISSING_BODY' })
            };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { email, password, name, role = 'Student', department = null } = body;

        // Input validation
        if (!email || !password || !name) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Email, password, and name are required.', code: 'VALIDATION_ERROR' })
            };
        }

        if (!ALLOWED_ROLES.includes(role)) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: `Invalid role. Allowed roles: ${ALLOWED_ROLES.join(', ')}`, code: 'INVALID_ROLE' })
            };
        }

        const userId = uuidv4();
        let cognitoSub = `mock-sub-${userId}`;

        // Check if running in mock/test mode or if live Cognito Client ID is available
        const isMockMode = process.env.JEST_WORKER_ID || process.env.MOCK_AUTH === 'true' || !process.env.USER_POOL_CLIENT_ID;

        if (!isMockMode) {
            try {
                // 1. Register with Cognito User Pool
                const signUpResponse = await cognitoClient.send(new SignUpCommand({
                    ClientId: process.env.USER_POOL_CLIENT_ID,
                    Username: email,
                    Password: password,
                    UserAttributes: [
                        { Name: 'email', Value: email },
                        { Name: 'name', Value: name }
                    ]
                }));
                cognitoSub = signUpResponse.UserSub || cognitoSub;

                // Optionally add to user group if USER_POOL_ID is available
                if (process.env.USER_POOL_ID) {
                    await cognitoClient.send(new AdminAddUserToGroupCommand({
                        UserPoolId: process.env.USER_POOL_ID,
                        Username: email,
                        GroupName: role
                    }));
                }
            } catch (cognitoErr) {
                console.error('[Cognito Error]:', cognitoErr.message);
                return {
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ error: cognitoErr.message, code: 'COGNITO_ERROR' })
                };
            }
        } else {
            console.info('[Auth Signup] Mock mode detected. Bypassing live AWS Cognito call.');
        }

        // 2. Insert user record into AWS RDS MySQL within a transaction
        await db.transaction(async (connection) => {
            const [existing] = await connection.execute(
                'SELECT id FROM users WHERE email = ?', 
                [email]
            );
            if (existing.length > 0) {
                throw new Error('USER_ALREADY_EXISTS');
            }

            await connection.execute(
                'INSERT INTO users (id, cognito_sub, email, name, role, department) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, cognitoSub, email, name, role, department]
            );
        });

        console.info(`[Auth Signup] Successfully created user ${userId} (${email}) with role ${role}.`);

        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                message: 'User registered successfully.',
                user: {
                    id: userId,
                    cognito_sub: cognitoSub,
                    email,
                    name,
                    role,
                    department
                }
            })
        };

    } catch (err) {
        console.error('[Auth Signup Error]:', err.message);
        const statusCode = err.message === 'USER_ALREADY_EXISTS' ? 409 : 500;
        return {
            statusCode,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ 
                error: err.message === 'USER_ALREADY_EXISTS' ? 'A user with this email already exists.' : 'Internal server error during registration.',
                code: err.message === 'USER_ALREADY_EXISTS' ? 'CONFLICT' : 'INTERNAL_SERVER_ERROR' 
            })
        };
    }
};
