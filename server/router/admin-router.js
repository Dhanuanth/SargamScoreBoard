const Express = require('express');
const { HOUSE } = require('../database');
const httpError = require('../error-handling/http-error');
const mongoPractice = require('../mongo.js');

const { updateEventPoints } = require('../controller/event-controller');

const router = Express.Router();

router.post('/signup',mongoPractice.createAdmin);
router.post('/signin',mongoPractice.getAllUsers);

router.get('/houses',mongoPractice.getAllHouses);
router.get('/events',mongoPractice.getAllEvents);
router.patch('/event/:eid',updateEventPoints);

module.exports = router;