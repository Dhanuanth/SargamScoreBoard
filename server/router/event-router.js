
const Express = require('express');
const {getAllHouses, getHouse,getEvent, updateEventPoints,getAllEvents} = require('../controller/event-controller.js')
const mongoPractice = require('../mongo.js');

const router = Express.Router();

router.get('/houses',mongoPractice.getAllHouses);
router.get('/events',mongoPractice.getAllEvents);


//router.patch('/admin/:eid',updateEventPoints)


module.exports = router;
