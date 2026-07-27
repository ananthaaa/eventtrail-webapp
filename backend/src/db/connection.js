/**
 * EventTrail (CampusPulse) — RDS MySQL Connection Pool
 * Optimized for AWS RDS db.t3.micro (Free Tier) in ap-south-1.
 * Supports connection pooling and automatic reconnection.
 */

const mysql = require('mysql2/promise');

let pool = null;

/**
 * Get or initialize the MySQL connection pool.
 * Environment variables can be dynamically populated by AWS CloudFormation/SAM
 * using {{resolve:secretsmanager:SecretId:SecretString:json-key}}.
 */
async function getPool() {
    if (pool) {
        return pool;
    }

    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'eventtrail_db';
    const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

    console.info(`[DB] Initializing MySQL connection pool for database "${database}" on ${host}:${port}`);

    pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 5, // Keep low for db.t3.micro free tier RAM limits
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000
    });

    // Test connection
    try {
        const connection = await pool.getConnection();
        console.info('[DB] Successfully connected to RDS MySQL.');
        connection.release();
    } catch (err) {
        console.error('[DB] Failed to connect to database:', err.message);
        throw err;
    }

    return pool;
}

/**
 * Execute a SQL query with parameter binding.
 */
async function query(sql, params = []) {
    const dbPool = await getPool();
    try {
        const [rows, fields] = await dbPool.execute(sql, params);
        return { rows, fields };
    } catch (err) {
        console.error(`[DB Query Error] SQL: ${sql} | Error: ${err.message}`);
        throw err;
    }
}

/**
 * Execute multiple queries inside a database transaction.
 * @param {Function} callback - Async function receiving the connection object.
 */
async function transaction(callback) {
    const dbPool = await getPool();
    const connection = await dbPool.getConnection();
    await connection.beginTransaction();

    try {
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (err) {
        await connection.rollback();
        console.error('[DB Transaction Rolled Back]:', err.message);
        throw err;
    } finally {
        connection.release();
    }
}

/**
 * Close pool (useful for clean Jest test termination).
 */
async function closePool() {
    if (pool) {
        await pool.end();
        pool = null;
        console.info('[DB] Connection pool closed.');
    }
}

module.exports = {
    getPool,
    query,
    transaction,
    closePool
};
