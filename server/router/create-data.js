const Express = require('express');
const { HOUSE } = require('../database');
const httpError = require('../error-handling/http-error');
const mongoPractice = require('../mongo.js');

const router = Express.Router();

router.post('/house',mongoPractice.createHouse);
router.post('/event',mongoPractice.createEvent);

module.exports = router;