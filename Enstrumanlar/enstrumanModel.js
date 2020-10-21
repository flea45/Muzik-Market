const mongoose = require("mongoose");

mongoose.model("Enstruman", {

    Tür :{
        type: String,
        required : true  
    },
    Marka :{
        type: String,
        required : true
    },
    Fiyat :{
        type : Number,
        required: true
    },
    Satıcı:{
        type: String,
        required: false
    }

});