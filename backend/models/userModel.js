// models/UserModel.js
import { pool } from '../app/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const getAllUsers = async () => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM mst_users');
        return rows;
    } finally {
        client.release();
    }
};

const getUserById = async (id) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM mst_users WHERE mu_userid = $1', [id]);
        return rows[0];
    } finally {
        client.release();
    }
};

const createUser = async ({ post }) => {
    const client = await pool.connect();
    try {
        const {username, password } = post;
        // Menggunakan bcrypt untuk menghash password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah cost factor untuk kekuatan hash

        const id = uuidv4();
        const queryText = `
            INSERT INTO mst_users(mu_userid, mu_username, mu_password) 
            VALUES($1, $2, $3) 
            RETURNING *`;
        const values = [id, username, hashedPassword];
        const { rows } = await client.query(queryText, values);
        return rows[0];
    } finally {
        client.release();
    }
};

const updateUser = async (post, id) => {
    const client = await pool.connect();
    try {
        const { username, password } = post;
        let values = [username];
        let queryText = 'UPDATE mst_users SET mu_username = $1';
        
        // Jika password ada, tambahkan ke query dan values
        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            queryText += ', mu_password = $2';
            values.push(hashedPassword);
        }

        queryText += ' WHERE mu_userid = $' + (values.length + 1) + ' RETURNING *';
        values.push(id);

        const { rows } = await client.query(queryText, values);
        return rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    } finally {
        client.release();
    }
};

const deleteUser = async (id) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    } finally {
        client.release();
    }
};

const checkUsername = async (post = null, id= null) => {
    const client = await pool.connect();
    try {
        const { username } = post;
        const queryText = 'SELECT * FROM mst_users WHERE LOWER(mu_username) = LOWER($1)';
        const { rows } = await client.query(queryText, [username]);
        return rows[0]; // Mengembalikan baris pertama dari hasil query
    } finally {
        client.release();
    }
};


export { getAllUsers, getUserById, createUser, updateUser, deleteUser, checkUsername };
