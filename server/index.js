const Express = require('express');
const eventRouter = require('./router/event-router.js');
const HttpError = require('./error-handling/http-error.js');
const bodyParser = require('body-parser');


const app = Express();
app.use(bodyParser.json());
app.use('/',eventRouter);

app.use((req,res,next)=>{
    throw new HttpError("Couldnt find this page",404);
})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "An unknown error occured!"})
})


app.listen(5000);

