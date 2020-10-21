const mongoose = require("mongoose");

mongoose.model('Musteri', {
    Ad: {
        type: String,
        required: true
    },
    Soyad: {
        type:String,
        required:true
    },
    Adres:{
        type: String,
        required: true
    }
});
