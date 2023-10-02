
const { HOUSE, EVENT } = require("../database.js");
const HttpError = require("../error-handling/http-error.js");


const getById = (id,DB) =>{
    return DB.find(item=>{
       return item.id===id;
    })
    
};

const updateHousePoints = (newPoints) =>{
    veda = getById("veda",HOUSE);
    vyoma = getById("vyoma",HOUSE);
    jwala = getById("jwala",HOUSE);
    tatva = getById("tatva",HOUSE);

    veda.points += newPoints[0] - veda.points;
    vyoma.points += newPoints[1] - vyoma.points;
    jwala.points += newPoints[2] - jwala.points;
    tatva.points += newPoints[3] - tatva.points;
    console.log(tatva);
}

///////
const getHouse = (req, res, next) => {
    const houseId = req.params.hid;
    const loginHouse = HOUSE.find(house => {
        return house.id === houseId;
    })
    if (!loginHouse) {
        return next(new HttpError("Couldnt find the house", 404));
    }
    res.json({ loginHouse });
}
const getEvent = (req, res, next) => {
    //console.log(req.params.hid);
    const eventId = req.params.eid;
    const selectedEvent = EVENT.find(event => {
        return event.id === eventId;
    })

    if (!selectedEvent) {
        return next(new HttpError("Couldnt find the event", 404));
    }
    res.json({ selectedEvent });
}



const updateEventPoints = (req, res, next) => {

    const eventId = req.params.eid;
    const newPoints = req.body.points;
    const updatedEvent = getById(eventId,EVENT);
    if (!updatedEvent) {
        return next(new HttpError("Couldnt find the event", 404));
    };

    updatedEvent.points = newPoints;
    updateHousePoints(newPoints);

    res.json({ updatedEvent });
}


module.exports = { getHouse, getEvent,updateEventPoints };