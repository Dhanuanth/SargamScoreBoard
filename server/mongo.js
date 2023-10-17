const { HOUSE, EVENT } = require('./database');
const bcrypt = require('bcryptjs');
const httpError = require('./error-handling/http-error');
const MongoClient = require('mongodb').MongoClient;
// mongodb+srv://dhanuanth:<password>@cluster1.ocshej5.mongodb.net/?retryWrites=true&w=majority

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.ocshej5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const createHouse = async (req, res, next) => {

    const newHouse = {
        id: req.body.id,
        points: req.body.points
    }

    if (!newHouse) {
        return next(new httpError("No house specified", 404));
    }
    HOUSE.push(newHouse);


    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('houses').insertOne(newHouse);

    } catch (error) {
        console.log(error);
        return res.json({ message: "Couldnt store data." })
    };
    client.close();
    res.json(newHouse);

}

const getAllHouses = async (req, res, next) => {
    const client = new MongoClient(url);
    let product;

    try {
        await client.connect();
        const db = client.db();
        product = await db.collection('houses').find().toArray();

    } catch (error) {
        console.log(error);
        return res.json({ message: "Couldnt receive products." })
    };
    client.close();
    res.json(product);
}

const insertAllHouses = async (req, res, next) => {
    const client = new MongoClient(url);
    let product;

    try {
        await client.connect();
        const db = client.db();
        product = await db.collection('houses').insertMany(EVENT);

    } catch (error) {
        console.log(error);
        return res.json({ message: "Couldnt receive products." })
    };
    client.close();
    res.json(product);
}




const createEvent = async (req, res, next) => {

    const newEvent = {
        id: req.body.id,
        title: req.body.title,
        points: req.body.points
    }

    if (!newEvent) {
        return next(new httpError("No event specified", 404));
    }
    EVENT.push(newEvent);


    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('events').insertOne(newEvent);

    } catch (error) {
        console.log(error);
        return res.json({ message: "Couldnt store data." })
    };
    client.close();
    res.json(newEvent);

}


const getAllEvents = async (req, res, next) => {
    const client = new MongoClient(url);
    let product;

    try {
        await client.connect();
        const db = client.db();
        product = await db.collection('events').find().toArray();

    } catch (error) {
        console.log(error);
        return res.json({ message: "Couldnt receive products." })
    };
    client.close();
    res.json(product);
}
const createAdmin = async (req, res, next) => {

    const { name, password } = req.body;



    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new httpError("cannot create user admin", 404));
    }
    const newAdmin = {
        name,
        password: hashPassword
    }

    if (!newAdmin) {
        return next(new httpError("No admin specified", 500));
    }
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('users').insertOne(newAdmin);

    } catch (error) {
        console.log(error);
        return res.json({ message: "Couldnt store data." })
    };
    client.close();
    res.json(newAdmin);

}
// const comparePassword= async( pw,epw)=>{

//     let isValidPassword = await bcrypt.compare(pw,epw);

//     return isValidPassword;
// }

const getAllUsers = async (req, res, next) => {
    const client = new MongoClient(url);
    const { name, password } = req.body;
    let loginUser;
    let product;

    try {
        await client.connect();
        const db = client.db();
        product = await db.collection('users').find().toArray();
    } catch (error) {
        console.log(error);
        return next(new httpError("Couldnt get the admin DB", 404));
    };

    let loginAdmin;
    try {

        product.forEach(user => {

            if (user.name == name) {
                loginAdmin = user;
            }

        });

        if (loginAdmin) {
            let isValidPassword = await bcrypt.compare(password, loginAdmin.password);

            if (!isValidPassword) {
                return res.json({ message: "Invalid Password" }).status(404);
            }
        }
        else{
            return next(new httpError("Couldnt identify user.", 404));
        }

    } catch (error) {
        console.log(error);
        return next(new httpError("Couldnt identify user.", 404));
    }

    client.close();
    res.json(loginAdmin);

}
module.exports = { createHouse, getAllHouses, createEvent, getAllEvents, insertAllHouses, createAdmin, getAllUsers }