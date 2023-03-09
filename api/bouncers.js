const express = require('express');
const router = express.Router();

const { getAllBouncers, getBouncerById, updateBouncerById, deleteBouncerById } = require('../db/bouncers');

const { requireUser } = require('./utils');

// GET - /api/bouncers - get all bouncers
router.get('/', async (req, res, next) => {
    try {
        const bouncers = await getAllBouncers();
        res.send(bouncers);
    } catch (error) {
        next(error);
    }
});

// GET - /api/bouncers/:bouncerId - get bouncer by id
router.get('/:bouncerId', async (req, res, next) => {
    try {
        const bouncer = await getBouncerById(req.params.bouncerId);
        res.send(bouncer);
    } catch (error) {
        next(error);
    }
});

// PATCH - /api/bouncers/:bouncerId - update bouncer by id
router.patch('/:bouncerId', requireUser, async (req, res, next) => {
    try {
        const bouncer = await updateBouncerById(req.params.bouncerId, req.body);
        res.send(bouncer);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/bouncers/:bouncerId - delete bouncer by id
router.delete('/:bouncerId', requireUser, async (req, res, next) => {
    try {
        const bouncer = await deleteBouncerById(req.params.bouncerId);
        res.send(bouncer);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
