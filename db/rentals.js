const client = require('./client');
const util = require('util');

// database functions
// async function to create initial rentals with user_id, bouncer_id, rental_date_from, rental_date_to, and total_price
async function createRentalData({ user_id, bouncer_id, rental_date_from, rental_date_to, total_price }) {
    try {
        const { rows: [rental] } = await client.query(`
            INSERT INTO rentals(user_id, bouncer_id, rental_date_from, rental_date_to, total_price)
            VALUES($1, $2, $3, $4, $5)
            ON CONFLICT (user_id, bouncer_id, rental_date_from, rental_date_to) DO NOTHING
            RETURNING *;
        `, [user_id, bouncer_id, rental_date_from, rental_date_to, total_price]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// async function to create new rentals that gets user_id from JWT token and total_price from bouncer price times number of days
async function createNewRental({ user_id, bouncer_id, rental_date_from, rental_date_to, total_price }) {
    try {
        const { rows: [rental] } = await client.query(`
            INSERT INTO rentals(user_id, bouncer_id, rental_date_from, rental_date_to, total_price)
            VALUES($1, $2, $3, $4, $5)
            ON CONFLICT (user_id, bouncer_id, rental_date_from, rental_date_to) DO NOTHING
            RETURNING *;
        `, [user_id, bouncer_id, rental_date_from, rental_date_to, total_price]);
        return rental;
        
    } catch (error) {
        throw error;
    }
}

// async function to get all rentals
async function getAllRentals() {
    try {
        const { rows: rentals } = await client.query(`
            SELECT * FROM rentals;
        `);
        return rentals;
    } catch (error) {
        throw error;
    }
}

// async function to get rental by id
async function getRentalById(id) {
    try {
        const { rows: [rental] } = await client.query(`
            SELECT * FROM rentals
            WHERE id=$1;
        `, [id]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// async function to update rental by id
async function updateRentalById(id, fields = {}) {
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
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return rental;
    } catch (error) {
        throw error;
    }
}

// async function to delete rental by id
async function deleteRentalById(id) {
    try {
        const { rows: [rental] } = await client.query(`
            DELETE FROM rentals
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return rental;
    } catch (error) {
        throw error;
    }
}

// export functions
module.exports = {
    createRentalData,
    createNewRental,
    getAllRentals,
    getRentalById,
    updateRentalById,
    deleteRentalById,
}