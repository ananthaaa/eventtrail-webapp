/**
 * EventTrail (CampusPulse) — Automated Integration Suite: Module 1 Auth
 * Verifies exit criteria: signup, verification, login, JWT token generation, and /users/me endpoint.
 */

const signupHandler = require('../../src/handlers/auth/signup');
const loginHandler = require('../../src/handlers/auth/login');
const meHandler = require('../../src/handlers/users/me');

// Mock database connection pool for automated verification without live AWS RDS connection
jest.mock('../../src/db/connection', () => {
    const mockUsers = {};
    return {
        query: jest.fn(async (sql, params) => {
            if (sql.includes('SELECT') && sql.includes('WHERE email = ?')) {
                const email = params[0];
                const user = Object.values(mockUsers).find(u => u.email === email);
                return { rows: user ? [user] : [] };
            }
            if (sql.includes('SELECT') && sql.includes('WHERE cognito_sub = ?')) {
                const sub = params[0];
                const user = Object.values(mockUsers).find(u => u.cognito_sub === sub);
                return { rows: user ? [user] : [] };
            }
            if (sql.includes('UPDATE users SET')) {
                const [name, department, interests, id] = params;
                if (mockUsers[id]) {
                    mockUsers[id].name = name;
                    mockUsers[id].department = department;
                    mockUsers[id].interests_json = interests;
                }
                return { rows: { affectedRows: 1 } };
            }
            return { rows: [] };
        }),
        transaction: jest.fn(async (callback) => {
            const mockConn = {
                execute: jest.fn(async (sql, params) => {
                    if (sql.includes('SELECT id FROM users WHERE email = ?')) {
                        const email = params[0];
                        const exists = Object.values(mockUsers).some(u => u.email === email);
                        return [exists ? [{ id: 'existing-id' }] : []];
                    }
                    if (sql.includes('INSERT INTO users')) {
                        const [id, cognito_sub, email, name, role, department] = params;
                        mockUsers[id] = {
                            id,
                            cognito_sub,
                            email,
                            name,
                            role,
                            department,
                            interests_json: '[]',
                            created_at: new Date().toISOString()
                        };
                        return [{ affectedRows: 1 }];
                    }
                    return [[]];
                })
            };
            return await callback(mockConn);
        }),
        closePool: jest.fn()
    };
});

// Set mock auth environment flag
process.env.MOCK_AUTH = 'true';
process.env.JWT_SECRET = 'test-secret-key-for-auth-suite';

describe('Module 1: Foundation, Infrastructure & Auth — Integration Test Suite', () => {
    let testUserToken = '';
    let testUserEmail = 'student.test@asiet.ac.in';
    let testUserSub = '';

    test('1. POST /auth/signup — Should fail when request body is missing or invalid', async () => {
        const response = await signupHandler.handler({});
        expect(response.statusCode).toBe(400);
        const body = JSON.parse(response.body);
        expect(body.code).toBe('MISSING_BODY');
    });

    test('2. POST /auth/signup — Should successfully register a new student user', async () => {
        const event = {
            body: JSON.stringify({
                email: testUserEmail,
                password: 'SecurePassword123!',
                name: 'Anantha Krishnan',
                role: 'Student',
                department: 'MCA'
            })
        };

        const response = await signupHandler.handler(event);
        expect(response.statusCode).toBe(201);
        const body = JSON.parse(response.body);
        expect(body.message).toBe('User registered successfully.');
        expect(body.user.email).toBe(testUserEmail);
        expect(body.user.role).toBe('Student');
        testUserSub = body.user.cognito_sub;
    });

    test('3. POST /auth/signup — Should reject duplicate email registration with 409 Conflict', async () => {
        const event = {
            body: JSON.stringify({
                email: testUserEmail,
                password: 'AnotherPassword123!',
                name: 'Duplicate User',
                role: 'Student'
            })
        };

        const response = await signupHandler.handler(event);
        expect(response.statusCode).toBe(409);
        const body = JSON.parse(response.body);
        expect(body.code).toBe('CONFLICT');
    });

    test('4. POST /auth/login — Should fail with 401 Unauthorized for invalid credentials/user', async () => {
        const event = {
            body: JSON.stringify({
                email: 'nonexistent@asiet.ac.in',
                password: 'WrongPassword!'
            })
        };

        const response = await loginHandler.handler(event);
        expect(response.statusCode).toBe(401);
        const body = JSON.parse(response.body);
        expect(body.code).toBe('UNAUTHORIZED');
    });

    test('5. POST /auth/login — Should authenticate valid user and return JWT Access/Id tokens', async () => {
        const event = {
            body: JSON.stringify({
                email: testUserEmail,
                password: 'SecurePassword123!'
            })
        };

        const response = await loginHandler.handler(event);
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.message).toBe('Login successful.');
        expect(body.tokens.id_token).toBeDefined();
        expect(body.tokens.access_token).toBeDefined();
        expect(body.tokens.token_type).toBe('Bearer');
        expect(body.user.email).toBe(testUserEmail);

        testUserToken = body.tokens.id_token;
    });

    test('6. GET /users/me — Should reject unauthenticated request without Authorization header', async () => {
        const event = {
            httpMethod: 'GET',
            headers: {}
        };

        const response = await meHandler.handler(event);
        expect(response.statusCode).toBe(401);
        const body = JSON.parse(response.body);
        expect(body.code).toBe('UNAUTHORIZED');
    });

    test('7. GET /users/me — Should return authenticated user profile when passing valid Bearer JWT', async () => {
        const event = {
            httpMethod: 'GET',
            headers: {
                Authorization: `Bearer ${testUserToken}`
            }
        };

        const response = await meHandler.handler(event);
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.user.email).toBe(testUserEmail);
        expect(body.user.name).toBe('Anantha Krishnan');
        expect(body.user.department).toBe('MCA');
    });

    test('8. PUT /users/me — Should update user profile (name, department, interests) with valid JWT', async () => {
        const event = {
            httpMethod: 'PUT',
            headers: {
                Authorization: `Bearer ${testUserToken}`
            },
            body: JSON.stringify({
                name: 'Anantha Krishnan A',
                department: 'Computer Applications (MCA)',
                interests: ['AI', 'Cloud Architecture', 'Web Development']
            })
        };

        const response = await meHandler.handler(event);
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.message).toBe('User profile updated successfully.');
        expect(body.user.name).toBe('Anantha Krishnan A');
        expect(body.user.department).toBe('Computer Applications (MCA)');
        expect(body.user.interests).toContain('Cloud Architecture');
    });
});
