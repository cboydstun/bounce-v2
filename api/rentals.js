const express = require('express');
const router = express.Router();
const { getAllRentals,
    getRentalById,
    createNewRental,
    updateRentalById,
    deleteRentalById,
    getBouncerById, getBouncerPriceById } = require('../db');
const { requireUser, calculateRentalPrice, checkRentalExists } = require('./utils');

// GET /api/rentals - get all rentals
router.get('/', async (req, res, next) => {
    try {
        const rentals = await getAllRentals();
        res.send(rentals);
    } catch (error) {
        throw error;
    }
});

// GET /api/rentals/:rentalId - get rental by id
router.get('/:rentalId', async (req, res, next) => {
    try {
        const rental = await getRentalById(req.params.rentalId);
        res.send(rental);
    } catch (error) {
        throw error;
    }
});

// POST - api/rentals - create new rentals that gets user_id from JWT token and total_price from bouncer price times number of days
router.post('/', requireUser, async (req, res, next) => {
    try {
        // destructuring req.body
        const { bouncer_id, rental_date_from, rental_date_to } = req.body;

        // get user id from token
        const { id: user_id } = req.user;

        // error handling
        if (!bouncer_id || !rental_date_from || !rental_date_to) {
            return res.status(400).send({ message: 'Please provide bouncer_id, rental_date_from, and rental_date_to' });
        }

        // check if bouncer exists
        const bouncer = await getBouncerById(bouncer_id);
        if (!bouncer) {
            return res.status(400).send({ message: 'Bouncer does not exist' });
        }

        // check if rental exists
        const rentalExists = await checkRentalExists(bouncer_id, rental_date_from, rental_date_to);
        if (rentalExists) {
            return res.status(400).send({ message: 'Rental already exists' });
        }

        // check if rental is in the past
        const rentalDateFrom = new Date(rental_date_from);
        const rentalDateTo = new Date(rental_date_to);
        if (rentalDateFrom < new Date() || rentalDateTo < new Date()) {
            return res.status(400).send({ message: 'Rental date cannot be in the past' });
        }

        // check if rental date from is before rental date to
        if (rentalDateFrom > rentalDateTo) {
            return res.status(400).send({ message: 'Rental date from cannot be after rental date to' });
        }



        // calculate total price of rental
        const total_price = await calculateRentalPrice(bouncer_id, rental_date_from, rental_date_to);

        console.log('total_price in rentals api', total_price);

        // create new rental
        const rental = await createNewRental({
            bouncer_id,
            rental_date_from,
            rental_date_to,
            total_price,
            user_id
        });

        // send back rental
        res.send(rental);
    } catch (error) {
        throw error;
    }
});


// PATCH /api/rentals/:rentalId - update rental by id
router.patch('/:rentalId', requireUser, async (req, res, next) => {
    try {
        const rental = await updateRentalById(req.params.rentalId, req.body);
        res.send(rental);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/rentals/:rentalId - delete rental by id
router.delete('/:rentalId', requireUser, async (req, res, next) => {
    try {
        const rental = await deleteRentalById(req.params.rentalId);
        res.send(rental);
    } catch (error) {
        throw error;
    }
});

// export router
module.exports = router;