const client = require('../db/client');

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

// takes required parameters as an array, returns a middleware function that sends back a message if they're not present
const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    // for operations that need at least one param. Not all required.
    if (atLeastOne) {
      let numParamsFound = 0;
      for (let param of requiredParams) {
        if (req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if (!numParamsFound) {
        next({
          name: 'MissingParams',
          message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
        })
      } else {
        next();
      }
    } else {
      // figure out which ones are not defined, and return them
      const notSent = [];
      for (let param of requiredParams) {
        if (req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if (notSent.length) next({
        name: 'MissingParams',
        message: `Required Parameters not sent in body: ${notSent.join(', ')}`
      })
      next();
    }
  }
}

// calculate total price of rental by taking the bounce id, rental dates, and price per day
async function calculateRentalPrice(bouncer_id, rental_date_from, rental_date_to) {
  console.log('bouncer_id in calculateRentalPrice', bouncer_id);
  console.log('rental_date_from in calculateRentalPrice', rental_date_from);
  console.log('rental_date_to in calculateRentalPrice', rental_date_to);

  try {
    const { rows: [bouncer] } = await client.query(`
      SELECT price
      FROM bouncers
      WHERE id=$1
    `, [bouncer_id]);

    const price_per_day = bouncer.price;

    const rentalDays = rental_date_to - rental_date_from;

    // total price is rental days * price per day, but should always be at least one day
    const total_price = Math.max(rentalDays, 1) * price_per_day;

    return total_price;
  } catch (error) {
    throw error;
  }
}


// check if a bouncer is already rented on a given date
async function checkRentalExists(bouncer_id, rental_date_from) {
  try {
    const { rows: [rental] } = await client.query(`
      SELECT *
      FROM rentals
      WHERE bouncer_id=$1
      AND rental_date_from <= $2
      AND rental_date_to >= $2
    `, [bouncer_id, rental_date_from]);

    return rental;

  } catch (error) {
    throw error;
  }
}



module.exports = {
  requireUser,
  requiredNotSent,
  calculateRentalPrice,
  checkRentalExists
}