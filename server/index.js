const Express = require('express');
const eventRouter = require('./router/event-router.js');
const adminRouter = require('./router/admin-router.js')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const HttpError = require('./error-handling/http-error.js');
// const cors = require('cors');

const app = Express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH');
    next();
})
// app.use(cors({ origin: 'http://localhost:3000' }));

//app.use('/:hid',createRouter); //for creating new events or house which we dont need now

app.use('/api',eventRouter);   ///get all events

app.use('/api/admin',adminRouter)     
     //for updating events
app.use(Express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// app.use((req,res,next)=>{
//     throw new HttpError("Couldnt find this page",404);
// })

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "An unknown error occured!"})
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.ocshej5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(()=>{
    // House.insertMany(HOUSE);
    app.listen(5000);

}).catch((err)=>{
    console.log(err);
});

