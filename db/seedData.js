const client = require('./client');

const { createUser, createBike, createRentalData } = require('./');

// drop all tables if any exist
async function dropTables() {
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS rentals;
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
        CREATE TABLE bikes (
            id SERIAL PRIMARY KEY,
            color TEXT,
            description TEXT,
            size TEXT,
            price DECIMAL(10,2)
          );
      `);

        await client.query(`
        CREATE TABLE rentals (
            id SERIAL PRIMARY KEY,
            bike_id INTEGER REFERENCES bikes(id),
            user_id INTEGER REFERENCES users(id),
            rental_date_from DATE,
            rental_date_to DATE,
            total_price DECIMAL(10,2),
            CONSTRAINT unique_bike_rental_date_from UNIQUE (bike_id, rental_date_from)
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

// async function to create initial users
async function createInitialBikes() {
    try {
        console.log("Starting to create bikes...");

        const bikesToCreate = [
            { color: "red", description: "A red bike", size: "small", price: 10.00 },
            { color: "blue", description: "A blue bike", size: "medium", price: 20.00 },
            { color: "green", description: "A green bike", size: "large", price: 30.00 },
            { color: "yellow", description: "A yellow bike", size: "small", price: 10.00 },
            { color: "orange", description: "An orange bike", size: "medium", price: 20.00 },
            { color: "purple", description: "A purple bike", size: "large", price: 30.00 },
            { color: "black", description: "A black bike", size: "small", price: 10.00 },
            { color: "white", description: "A white bike", size: "medium", price: 20.00 },
            { color: "grey", description: "A grey bike", size: "large", price: 30.00 },
            { color: "brown", description: "A brown bike", size: "small", price: 10.00 },
            { color: "pink", description: "A pink bike", size: "medium", price: 20.00 },
            { color: "silver", description: "A silver bike", size: "large", price: 30.00 },
            { color: "gold", description: "A gold bike", size: "small", price: 10.00 },
            { color: "rainbow", description: "A rainbow bike", size: "medium", price: 20.00 }];

        const bikes = await Promise.all(bikesToCreate.map(bike => {
            return createBike({
                color: bike.color,
                description: bike.description,
                size: bike.size,
                price: bike.price
            });
        }));

        console.log("Bikes created:");

    } catch (error) {
        throw error;
    }
}

// async function to create initial artists
async function createInitialRentals() {
    try {
        console.log("Starting to create rentals...");

        // bike_id INTEGER REFERENCES bikes(id), user_id INTEGER REFERENCES users(id), rental_date_from DATE, rental_date_to DATE, total_price DECIMAL(10,2)
        const rentalsToCreate = [
            { bike_id: 1, user_id: 2, rental_date_from: "2021-01-01", rental_date_to: "2021-01-02", total_price: 10.00 },
            { bike_id: 2, user_id: 3, rental_date_from: "2021-01-01", rental_date_to: "2021-01-02", total_price: 20.00 },
            { bike_id: 3, user_id: 1, rental_date_from: "2021-01-01", rental_date_to: "2021-01-02", total_price: 30.00 },
        ];

        const rentals = await Promise.all(rentalsToCreate.map(rental => {
            return createRentalData({
                bike_id: rental.bike_id,
                user_id: rental.user_id,
                rental_date_from: rental.rental_date_from,
                rental_date_to: rental.rental_date_to,
                total_price: rental.total_price
            });
        }));

        console.log("Rentals created:");

    } catch (error) {
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
        await createInitialBikes();
        await createInitialRentals();
    } catch (error) {
        throw error;
    }
}

// export rebuildDB function
module.exports = {
    rebuildDB
}