# SATX Bounce v2

an API and Next.js project for a party rental service using node, express, and postgresql

# PostgreSQL Setup

PostgreSQL should be installed and working at port 5432.

Login as "postgres" user

    sudo -u postgres psql ## on mac or linux

    or

    psql -U postgres ## on windows

Initialize new Database

    CREATE DATABASE bouncev2;

Show all databases

    \l

Connect to database

    \c bouncev2

## Getting Started

Clone the repository

    git clone ...

Install Packages

    npm i

Seed Database

    npm run seed

Start Server

    npm run start:dev

## API Endpoints

### Users

| Method | Route           | Description              | Public | Parameters               |
| ------ | --------------- | ------------------------ | ------ | ------------------------ |
| POST   | /users/register | Creates a new user       | true   | Name, Username, Password |
| POST   | /users/login    | Logs in a user           | true   | Username, Password       |
| GET    | /users/me       | Returns the current user | false  | JWT Token                |

### Bounce

| Method | Route       | Description               | Public | Parameters                                 |
| ------ | ----------- | ------------------------- | ------ | ------------------------------------------ |
| GET    | /bounce     | Returns all bounce houses | true   |                                            |
| GET    | /bounce/:id | Returns a bouncer         | true   |                                            |
| POST   | /bounce     | Creates a new bouncer     | false  | color, description, size, price, JWT Token |
| PATCH  | /bounce/:id | Updates a bouncer         | false  | color, description, size, price, JWT Token |
| DELETE | /bounce/:id | Deletes a bouncer         | false  | JWT Token                                  |
| DELETE | /bounce     | Deletes all bounce houses | false  | JWT Token                                  |

### Rentals

| Method | Route        | Description             | Public | Parameters                                           |
| ------ | ------------ | ----------------------- | ------ | ---------------------------------------------------- |
| GET    | /rentals     | Returns all rentals     | false  | JWT Token                                            |
| GET    | /rentals/:id | Returns a single rental | false  | JWT Token                                            |
| POST   | /rentals     | Creates a new rental    | false  | bike_id, rental_date_from, rental_date_to, JWT token |
| PATCH  | /rentals/:id | Updates a rental        | false  | bike_id, rental_date_from, rental_date_to, JWT Token |
| DELETE | /rentals/:id | Deletes a rental        | false  | JWT Token                                            |
| DELETE | /rentals     | Deletes all rentals     | false  | JWT Token                                            |

## Todo List

### Security

- [] add helmet
- [] add toobusy-js
- [] add express-rate-limit
- [] add xss-clean
- [] add body-parser limit
- [] add hsts to enforce https
- [] add CSRF protection
- [] add joi validation
- [] add html-escape
- [] add compression

### Epic Features

- [] add OAuth
- [] add PayPal integration

### Minor Features

- [] add user profile dashboard
- [] add user profile edit
- [] add user profile delete
- [] add user profile password change
- [] add user profile password reset
- [] add user profile password forgot
- [] add user profile password forgot email
