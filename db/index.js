module.exports = {
  // ...require('./client'), // adds key/values from users.js
  ...require('./users'), // adds key/values from users.js
  ...require('./bouncers'), // adds key/values from bouncers.js
  ...require('./rentals'), // adds key/values from rentals.js
}