const express = require("express");
const app = express();
const port = process.env.PORT || 7777;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios"); // Diğer servislerle ileitişim için kullanacağımız HTTP kütüphanesi

app.use(bodyParser.json());

var dbURI = "mongodb://localhost/Orders";
mongoose.connect(dbURI, {"useNewUrlParser" : true});
mongoose.connection.on("connected", () =>  {
    console.log("MongoDB "+dbURI+" adresindeki veritabanına bağlandı..\n");
});

require("./siparisModel");
const Siparis = mongoose.model("Siparis");
//ekleme
app.post("/siparis", (req,res) => {
    var newSiparis = {
        MusteriID: mongoose.Types.ObjectId(req.body.MusteriID),
        EnstrumanID:mongoose.Types.ObjectId(req.body.EnstrumanID),
        siparisTarihi :req.body.siparisTarihi,
        teslimat:req.body.teslimat
    }
    var siparis = new Siparis(newSiparis);
    siparis.save().then(() => {
        console.log("Sipariş oluşturuldu...");
    }).catch(error => {
        if(error){
            throw error;
        }
    });
    res.send("Veritabanına eklendi.");
});

//listeleme
app.get("/siparis", (req,res) => {
    Siparis.find().then((siparisler) => {
        res.json(siparisler);
    }).catch(error => {
        if(error){
            throw error;
        }
    });
});

app.get("/siparis/:id", (req,res) => {
    Siparis.findById(req.params.id).then((siparis) => {
        if(siparis){

            axios.get("http://localhost:5000/musteri/" + siparis.MusteriID).then((response) => {
                var siparisObject = {musteriAd : response.data.Ad, EnstrumanTür: '' }
                axios.get("http://localhost:4545/enstruman/"+ siparis.EnstrumanID).then((response) =>{
                    siparisObject.EnstrumanTür = response.data.Tür
                    res.json(siparisObject);
                });
            });

        }else{
            res.send("Geçersiz ID !!!");
        }
    });

});



app.listen(port, () => {
    console.log(`localhost:${port} üzerinden Siparişler Server'a erişebilirisiniz...`);
});