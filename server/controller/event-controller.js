

const HttpError = require("../error-handling/http-error.js");
const { House, Event } = require("../models/Schemas.js")


const getById = (id, DB) => {
    return DB.find(item => {
        return item.id === id;
    })

};

// const updateHousePoints = (newPoints) => {
//     veda = getById("veda", HOUSE);
//     vyoma = getById("vyoma", HOUSE);
//     jwala = getById("jwala", HOUSE);
//     tatva = getById("tatva", HOUSE);

//     veda.points += newPoints[0] - veda.points;
//     vyoma.points += newPoints[1] - vyoma.points;
//     jwala.points += newPoints[2] - jwala.points;
//     tatva.points += newPoints[3] - tatva.points;

// }

///////

const updateHousePoints = async (newPoints) => {

    let allHouses;

    try {
        allHouses = await House.find({});

        let i = 0;
        for (const house of houses) {
            house.points += newPoints[i] - house.points;

            await house.save();

            console.log(house);
            i++;
        };

    } catch (error) {
        return next(new HttpError("Couldnt update the House points", 500));
    }

}




const updateEventPoints = async (req, res, next) => {

    const eventId = req.params.eid;
    const newPoints = req.body.points;
    let updatedEvent;//= getById(eventId, EVENT);
    let oldPoints;
    try {
        updatedEvent = await Event.findById(eventId);
        oldPoints = updatedEvent.points;
    } catch (err) {
        return next(new HttpError("Couldnt update the event", 500));
    }


    if (!updatedEvent) {
        return next(new HttpError("Couldnt find the event", 404));
    };

    updatedEvent.points = newPoints;

    try {
        await updatedEvent.save();
    }
    catch (err) {
        return next(new HttpError("Couldnt save the updated event", 500));
    }


    let allHouses;

    try {
        allHouses = await House.find({});

        let i = 0;
        for (const house of allHouses) {
            house.points += newPoints[i] - oldPoints[i];
           
            try {
                await house.save();
            }
            catch (err) {
                return next(new HttpError("Couldnt update one of the House points", 500));
            }

            i++;
        };

    } catch (error) {
        return next(new HttpError("Couldnt update the House points", 500));
    }

    res.json({ updatedEvent: updatedEvent.toObject({ getters: true }) });
}

// const getHouse = async (req, res, next) => {
//     const houseId = req.params.hid;
//     let loginHouse;
//     try {
//         loginHouse = await House.find({id:houseId});
//     } catch (err) {
//         const error = new HttpError('Something went wrong,couldnt find thre house', 500);
//         next(error);
//     }

//     if (!loginHouse) {
//         return next(new HttpError("Couldnt find the house", 404));
//     }
//     res.json({ loginHouse });
// }


// const getEvent = async (req, res, next) => {//console.log(req.params.hid);
//     const eventId = req.params.eid;
//     let selectedEvent;
//     try {
//         selectedEvent = await Event.find({id:eventId});
//     } catch (err) {
//         const error = new HttpError('Something went wrong,couldnt find thre event', 500);
//         next(error);
//     }

//     if (!selectedEvent) {
//         return next(new HttpError("Couldnt find the event", 404));
//     }
//     res.json({ selectedEvent });
// }

module.exports = { updateEventPoints };