const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id:{type:String , required:true} ,
        title: {type:String , required:true},
        points: {type:Array , required:true}
});

const houseSchema = new Schema({
    
        id:{type:String , required:true},
        points:{type:Number , required:true}
    
});
const House = mongoose.model('House',houseSchema);
const Event = mongoose.model('Event',eventSchema);
module.exports = {House,Event}
