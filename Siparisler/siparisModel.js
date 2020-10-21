const mongoose = require("mongoose");

mongoose.model("Siparis", {
    MusteriID :{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    EnstrumanID: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
    siparisTarihi :{
        type: Date,
        required:true
    },
    teslimat: {
        type: Date,
        required:true
    }
});