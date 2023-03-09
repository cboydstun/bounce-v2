const { Client } = require('pg');

const connectionString = "postgres://rtuhrvix:5QfA1fcaC0LPMJALPn9aqjDAUDG7Mk7L@fanny.db.elephantsql.com/rtuhrvix";

const client = new Client({
  connectionString
});

module.exports = client;
