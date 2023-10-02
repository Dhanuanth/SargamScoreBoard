
const Express = require('express');
const {getHouse, getEvent, updateEventPoints} = require('../controller/event-controller.js')

const router = Express.Router();

router.get('/:hid',getHouse)
router.get('/:hid/:eid',getEvent)
router.patch('/event/:eid',updateEventPoints)


module.exports = router;
