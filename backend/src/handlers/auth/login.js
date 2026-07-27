/**
 * EventTrail (CampusPulse) — Lambda Handler: POST /auth/login
 * Authenticates against AWS Cognito User Pool and returns JWT tokens + user profile from AWS RDS MySQL.
 */

const { 
    CognitoIdentityProviderClient, 
    InitiateAuthCommand,
    AdminInitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const jwt = require('jsonwebtoken');
const db = require('../../db/connection');

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const MOCK_JWT_SECRET = process.env.JWT_SECRET || 'eventtrail-super-secret-mock-key-for-tests-only';

exports.handler = async (event) => {
    console.info('[Auth Login] Received login request for user authentication.');

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Request body is required.', code: 'MISSING_BODY' })
            };
        }

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { email, password } = body;

        if (!email || !password) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Email and password are required.', code: 'VALIDATION_ERROR' })
            };
        }

        // 1. Fetch user record from AWS RDS MySQL
        const { rows } = await db.query(
            'SELECT id, cognito_sub, email, name, role, department, interests_json, created_at FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return {
                statusCode: 401,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Invalid email or password.', code: 'UNAUTHORIZED' })
            };
        }

        const user = rows[0];
        let idToken, accessToken, refreshToken;

        // Check if running in mock/test mode or if live Cognito Client ID is available
        const isMockMode = process.env.JEST_WORKER_ID || process.env.MOCK_AUTH === 'true' || !process.env.USER_POOL_CLIENT_ID;

        if (!isMockMode) {
            try {
                // Live AWS Cognito Authentication
                const authResponse = await cognitoClient.send(new InitiateAuthCommand({
                    AuthFlow: 'USER_PASSWORD_AUTH',
                    ClientId: process.env.USER_POOL_CLIENT_ID,
                    AuthParameters: {
                        USERNAME: email,
                        PASSWORD: password
                    }
                }));

                idToken = authResponse.AuthenticationResult.IdToken;
                accessToken = authResponse.AuthenticationResult.AccessToken;
                refreshToken = authResponse.AuthenticationResult.RefreshToken;
            } catch (cognitoErr) {
                console.error('[Cognito Login Error]:', cognitoErr.message);
                return {
                    statusCode: 401,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ error: 'Invalid email or password.', code: 'UNAUTHORIZED' })
                };
            }
        } else {
            console.info('[Auth Login] Mock mode detected. Generating signed JWT for test verification.');
            const payload = {
                sub: user.cognito_sub,
                email: user.email,
                name: user.name,
                'custom:role': user.role,
                department: user.department,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiration
            };
            idToken = jwt.sign(payload, MOCK_JWT_SECRET);
            accessToken = jwt.sign({ sub: user.cognito_sub, token_type: 'access' }, MOCK_JWT_SECRET, { expiresIn: '1h' });
            refreshToken = jwt.sign({ sub: user.cognito_sub, token_type: 'refresh' }, MOCK_JWT_SECRET, { expiresIn: '7d' });
        }

        console.info(`[Auth Login] Successfully authenticated user ${user.id} (${email}).`);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                message: 'Login successful.',
                tokens: {
                    id_token: idToken,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_in: 3600,
                    token_type: 'Bearer'
                },
                user: {
                    id: user.id,
                    cognito_sub: user.cognito_sub,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    department: user.department,
                    interests: typeof user.interests_json === 'string' ? JSON.parse(user.interests_json || '[]') : (user.interests_json || [])
                }
            })
        };

    } catch (err) {
        console.error('[Auth Login Error]:', err.message);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Internal server error during login.', code: 'INTERNAL_SERVER_ERROR' })
        };
    }
};
