const client = require('./client');
const util = require('util');

// database functions
// async function to create bouncers including color, description, size, and price
async function createBouncer({ color, description, size, price }) {
    try {
        const { rows: [bouncer] } = await client.query(`
            INSERT INTO bouncers(color, description, size, price)
            VALUES($1, $2, $3, $4)
            ON CONFLICT (color) DO NOTHING
            RETURNING *;
        `, [color, description, size, price]);
        return bouncer;
    } catch (error) {
        throw error;
    }
}

// async function to get all bouncers
async function getAllBouncers() {
    try {
        const { rows: bouncers } = await client.query(`
            SELECT * FROM bouncers;
        `);
        return bouncers;
    } catch (error) {
        throw error;
    }
}

// async function to get bouncer by id
async function getBouncerById(id) {
    try {
        const { rows: [bouncer] } = await client.query(`
            SELECT * FROM bouncers
            WHERE id=$1;
        `, [id]);
        return bouncer;
          
    } catch (error) {
        throw error;
    }
}

// async function to get bouncer price by id
async function getBouncerPriceById(id) {
    try {
        const { rows: [bouncer] } = await client.query(`
            SELECT price FROM bouncers
            WHERE id=$1;
        `, [id]);
        return bouncer;

    } catch (error) {
        throw error;
    }
}

// async function to update bouncer by id
async function updateBouncerById(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [bouncer] } = await client.query(`
            UPDATE bouncers
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));

        return bouncer;
    } catch (error) {
        throw error;
    }
}

// async function to delete bouncer by id
async function deleteBouncerById(id) {
    try {
        const { rows: [bouncer] } = await client.query(`
            DELETE FROM bouncers
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return bouncer;
    } catch (error) {
        throw error;
    }
}

// export functions
module.exports = {
    createBouncer,
    getAllBouncers,
    getBouncerById,
    getBouncerPriceById,
    updateBouncerById,
    deleteBouncerById,
}
