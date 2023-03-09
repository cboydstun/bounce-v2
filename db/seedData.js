const client = require('./client');

const { createUser, createBouncer, createRentalData } = require('./');

// drop all tables if any exist
async function dropTables() {
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS rentals;
            DROP TABLE IF EXISTS bouncers;
            DROP TABLE IF EXISTS bikes;
            `);
        console.log("Finished dropping tables!");
    } catch (error) {
        throw error;
    }
}

// async function to create artists, songs, and artists_songs tables
async function createTables() {
    try {
        console.log("Starting to build tables...");

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name TEXT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            active BOOLEAN DEFAULT true
          );
        `);

        await client.query(`
        CREATE TABLE bouncers (
            id SERIAL PRIMARY KEY,
            color TEXT UNIQUE,
            description TEXT,
            size TEXT,
            price DECIMAL(10,2),
            CONSTRAINT unique_color_size_price UNIQUE (color, size, price)
            );     
        `);

        await client.query(`
        CREATE TABLE rentals (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            bouncer_id INTEGER REFERENCES bouncers(id),
            rental_date_from DATE,
            rental_date_to DATE,
            total_price DECIMAL(10,2),
            CONSTRAINT unique_user_bouncer_rental_date UNIQUE (user_id, bouncer_id, rental_date_from, rental_date_to)
            );
        `);


        console.log("Finished building tables!");
    } catch (error) {
        throw error;
    }
}

// async function to create initial users
async function createInitialUsers() {
    console.log('Starting to create users...');
    try {

        const usersToCreate = [
            { name: "al", username: 'albert', password: 'burts99' },
            { name: "sally", username: 'sandra', password: 'sassy123' },
            { name: "felicia", username: 'glamgal', password: 'glamgal123' },
        ]
        const users = await Promise.all(usersToCreate.map(createUser));

        console.log('Finished creating users!');
    } catch (error) {
        console.error('Error creating users!');
        throw error;
    }
}

// async function to create initial bouncers with color, description, size, and price
async function createInitialBouncers() {
    console.log('Starting to create bouncers...');
    try {

        const bouncersToCreate = [
            { color: "red", description: "red bouncer", size: "small", price: 100.00 },
            { color: "blue", description: "blue bouncer", size: "medium", price: 120.00 },
            { color: "green", description: "green bouncer", size: "large", price: 150.00 },
        ]
        const bouncers = await Promise.all(bouncersToCreate.map(createBouncer));

        console.log('Finished creating bouncers!');
    } catch (error) {
        console.error('Error creating bouncers!');
        throw error;
    }
}

// async function to create initial rentals
async function createInitialRentals() {
    console.log('Starting to create rentals...');
    try {
        const rentalsToCreate = [
            { user_id: 1, bouncer_id: 1, rental_date_from: '2021-01-01', rental_date_to: '2021-01-02', total_price: 10.00 },
            { user_id: 2, bouncer_id: 2, rental_date_from: '2021-01-01', rental_date_to: '2021-01-02', total_price: 20.00 },
            { user_id: 3, bouncer_id: 3, rental_date_from: '2021-01-01', rental_date_to: '2021-01-02', total_price: 30.00 }
        ]

        const rentals = await Promise.all(rentalsToCreate.map(createRentalData));

        console.log('Finished creating rentals!');
    } catch (error) {
        console.error('Error creating rentals!');
        throw error;
    }
}

// rebuild function to drop tables, create tables, and create initial users
async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialBouncers();
        await createInitialRentals();

        client.end();
    } catch (error) {
        throw error;
    }
}

// export rebuildDB function
module.exports = {
    rebuildDB
}