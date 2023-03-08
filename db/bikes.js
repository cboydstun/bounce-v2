const client = require('./client');
const util = require('util');

// database functions
// get all bikes
async function getAllBikes() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM bikes;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

// get bike by id
async function getBikeById(bikeId) {
    try {
        const { rows: [bike] } = await client.query(`
        SELECT *
        FROM bikes
        WHERE id = $1;
        `, [bikeId]);
        return bike;
    } catch (error) {
        throw error;
    }
}

// get bike price by id
async function getBikePriceById(bikeId) {
    try {
        const { rows: [bike] } = await client.query(`
        SELECT price
        FROM bikes
        WHERE id = $1;
        `, [bikeId]);
        return bike.price;
    } catch (error) {
        throw error;
    }
}


// create new bike requires color, description, size, price
async function createBike({ color, description, size, price }) {
    try {
        const { rows: [bike] } = await client.query(`
        INSERT INTO bikes(color, description, size, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [color, description, size, price]);
        return bike;
    } catch (error) {
        throw error;
    }
}

// update bike by id
async function updateBikeById(bikeId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [bike] } = await client.query(`
        UPDATE bikes
        SET ${setString}
        WHERE id=${bikeId}
        RETURNING *;
        `, Object.values(fields));

        return bike;
    } catch (error) {
        throw error;
    }
}

// delete bike by id
async function deleteBikeById(bikeId) {
    try {
        const { rows: [bike] } = await client.query(`
        DELETE FROM bikes
        WHERE id=$1
        RETURNING *;
        `, [bikeId]);
        return bike;
    } catch (error) {
        throw error;
    }
}

// delete all bikes
async function deleteAllBikes() {
    try {
        const { rows } = await client.query(`
        DELETE FROM bikes;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}


// export functions
module.exports = {
    getAllBikes,
    getBikeById,
    getBikePriceById,
    createBike,
    updateBikeById,
    deleteBikeById,
    deleteAllBikes
}
