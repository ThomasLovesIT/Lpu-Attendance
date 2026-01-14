import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();




const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const db = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL connected successfully');
        connection.release();
    } catch (error) {
        console.error('MySQL connection failed:', error.message);
        process.exit(1);
    }
};

export default pool; // optional if you want to query elsewhere
