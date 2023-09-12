const mongoose = require('mongoose');

const BoothData = mongoose.Schema({
    
        Polling_Booth_Number : {
            type: Number,
            required : true
        },
        Polling_Booth_Name : {
            type : String,
            required: true
        },

        Parent_Constituency : {
            type : String,
            require: true
        },
        Winner : {
            type : String,
            require: true
        },
        Total_Voters : {
            type : Number,
            require : true
        },
        BJP_Votes : {
            type : Number,
            require : true
        },
        INC_Votes : {
            type : Number,
            require : true
        }
})


const BoothDatas = mongoose.model('BoothDatas',BoothData);

module.exports = BoothDatas;