const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require("./musteriModel");
const Musteri = mongoose.model("Musteri");


var dbURI = "mongodb://localhost/Customers";
mongoose.connect(dbURI, {"useNewUrlParser" : true});
mongoose.connection.on("connected", function() {
    console.log("Mongoose "+dbURI+" adresindeki veritabanına bağlandı.\n");
});

app.post("/musteri",(req,res) => {

    var newMusteri = {
        Ad: req.body.Ad,
        Soyad: req.body.Soyad,
        Adres: req.body.Adres
    }
    var musteri = new Musteri(newMusteri);
    musteri.save().then(() => {
        console.log("Veritabanına eklendi...");
    }).catch(error => {
        if(error){
            throw error;
        }
    });
    res.send("Başarıyla eklendi.");

});

app.get("/musteri", (req,res) => {
    Musteri.find().then((musteri) => {
        res.json(musteri);
    }).catch(error => {
        if(error){
            throw error;
        }
    });
});

app.get("/musteri/:id", (req,res) => {
    Musteri.findById(req.params.id).then((musteri) =>{
        if(musteri){
            res.json(musteri);
        }
    }).catch(error => {
        if(error){
            res.status(404).send("Geçersiz ID!!!");
        }
    });
});

app.delete("/musteri/:id", (req,res) => {
    Musteri.findByIdAndRemove(req.params.id).then((musteri) => {
        res.send("Veritabanından Silindi....");
    }).catch(error => {
        if(error){
            res.status(404).send("Silme İşlemi Başarısız...");
        }
    });
});
//Müşteri Güncelleme Fonskiyonu
app.put("/musteri/update/:id", (req,res) => {
    Musteri.findById(req.params.id).exec(function(hata, gelenMusteri){
        if(!gelenMusteri){
            res.status(404).send("ID Bulunamadı");
        }else{
            gelenMusteri.Ad = req.body.Ad;
            gelenMusteri.Soyad =req.body.Soyad;
            gelenMusteri.Adres = req.body.Adres;
        }
        gelenMusteri.save().then(() => {
            console.log("Güncellendi...");
        }).catch(error => {
            if(error){
                throw error;
            }
        }); 
    res.send("Güncellendi.");
    });
});
    


app.listen(port, () => {
    console.log(`localhost:${port} -> üzerinden Müşteri server'a erişebilirsiniz.`);
});