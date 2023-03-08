const client = require('./client');
const util = require('util');

// database functions
// get all rentals
async function getAllRentals() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM rentals;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

// get rental by id
async function getRentalById(rentalId) {
    try {
        const { rows: [rental] } = await client.query(`
        SELECT *
        FROM rentals
        WHERE id = $1;
        `, [rentalId]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// create new rental
async function createRentalData({ bike_id, user_id, rental_date_from, rental_date_to, total_price }) {
    try {
        const { rows: [rental] } = await client.query(`
        INSERT INTO rentals(bike_id, user_id, rental_date_from, rental_date_to, total_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [bike_id, user_id, rental_date_from, rental_date_to, total_price]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// add new rental
async function createRental({ bike_id, user_id, rental_date_from, rental_date_to, total_price }) {

    try {
        const { rows: [rental] } = await client.query(`
        INSERT INTO rentals(bike_id, user_id, rental_date_from, rental_date_to, total_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [bike_id, user_id, rental_date_from, rental_date_to, total_price]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// update rental by id
async function updateRentalById(rentalId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [rental] } = await client.query(`
        UPDATE rentals
        SET ${ setString }
        WHERE id=${ rentalId }
        RETURNING *;
        `, Object.values(fields));
        return rental;
    } catch (error) {
        throw error;
    }
}

// delete rental by id
async function deleteRentalById(rentalId) {
    try {
        const { rows: [rental] } = await client.query(`
        DELETE FROM rentals
        WHERE id=$1
        RETURNING *;
        `, [rentalId]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// delete all rentals
async function deleteAllRentals() {
    try {
        const { rows } = await client.query(`
        DELETE FROM rentals;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

// export functions
module.exports = {
    getAllRentals,
    getRentalById,
    createRental,
    createRentalData,
    updateRentalById,
    deleteRentalById,
    deleteAllRentals
}
