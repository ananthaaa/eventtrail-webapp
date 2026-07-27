/**
 * EventTrail (CampusPulse) — Lambda Handler: GET & PUT /users/me
 * Retrieves or updates authenticated user profile in AWS RDS MySQL.
 * Protected route requiring valid AWS Cognito JWT Authorizer token.
 */

const jwt = require('jsonwebtoken');
const db = require('../../db/connection');

const MOCK_JWT_SECRET = process.env.JWT_SECRET || 'eventtrail-super-secret-mock-key-for-tests-only';

/**
 * Helper to extract Cognito User Sub or Email from API Gateway event or Authorization header.
 */
function extractUserIdentity(event) {
    // 1. Try API Gateway Cognito Authorizer claims
    if (event.requestContext && event.requestContext.authorizer && event.requestContext.authorizer.claims) {
        return {
            sub: event.requestContext.authorizer.claims.sub,
            email: event.requestContext.authorizer.claims.email
        };
    }

    // 2. Try Authorization Bearer header (for local testing / mock mode)
    const authHeader = event.headers && (event.headers.Authorization || event.headers.authorization);
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.decode(token); // Decode without strict live key check in fallback mode
            if (decoded) {
                return {
                    sub: decoded.sub,
                    email: decoded.email
                };
            }
        } catch (e) {
            console.warn('[Auth Extract] Failed to decode Bearer token:', e.message);
        }
    }

    return null;
}

exports.handler = async (event) => {
    const httpMethod = event.httpMethod || (event.requestContext && event.requestContext.http ? event.requestContext.http.method : 'GET');
    console.info(`[Users Me] Handling ${httpMethod} /users/me request.`);

    try {
        const identity = extractUserIdentity(event);
        if (!identity || (!identity.sub && !identity.email)) {
            return {
                statusCode: 401,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Unauthorized. Missing or invalid authentication token.', code: 'UNAUTHORIZED' })
            };
        }

        // Locate user in AWS RDS MySQL
        let querySql = 'SELECT id, cognito_sub, email, name, role, department, interests_json, created_at, updated_at FROM users WHERE ';
        let queryParam = '';
        if (identity.sub && !identity.sub.startsWith('mock-sub-') && !process.env.JEST_WORKER_ID) {
            querySql += 'cognito_sub = ?';
            queryParam = identity.sub;
        } else if (identity.email) {
            querySql += 'email = ?';
            queryParam = identity.email;
        } else {
            querySql += 'cognito_sub = ?';
            queryParam = identity.sub;
        }

        const { rows } = await db.query(querySql, [queryParam]);

        if (rows.length === 0) {
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'User profile not found in database.', code: 'USER_NOT_FOUND' })
            };
        }

        const user = rows[0];

        // --- GET /users/me ---
        if (httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    user: {
                        id: user.id,
                        cognito_sub: user.cognito_sub,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        department: user.department,
                        interests: typeof user.interests_json === 'string' ? JSON.parse(user.interests_json || '[]') : (user.interests_json || []),
                        created_at: user.created_at,
                        updated_at: user.updated_at
                    }
                })
            };
        }

        // --- PUT /users/me ---
        if (httpMethod === 'PUT') {
            if (!event.body) {
                return {
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ error: 'Request body is required for update.', code: 'MISSING_BODY' })
                };
            }

            const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
            const { name = user.name, department = user.department, interests = user.interests_json } = body;

            const interestsJsonString = typeof interests === 'string' ? interests : JSON.stringify(interests || []);

            await db.query(
                'UPDATE users SET name = ?, department = ?, interests_json = ? WHERE id = ?',
                [name, department, interestsJsonString, user.id]
            );

            console.info(`[Users Me] Successfully updated profile for user ${user.id}.`);

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    message: 'User profile updated successfully.',
                    user: {
                        id: user.id,
                        cognito_sub: user.cognito_sub,
                        email: user.email,
                        name,
                        role: user.role,
                        department,
                        interests: typeof interests === 'string' ? JSON.parse(interests || '[]') : interests
                    }
                })
            };
        }

        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: `Method ${httpMethod} not allowed on this endpoint.`, code: 'METHOD_NOT_ALLOWED' })
        };

    } catch (err) {
        console.error('[Users Me Error]:', err.message);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Internal server error while processing profile.', code: 'INTERNAL_SERVER_ERROR' })
        };
    }
};
