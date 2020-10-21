// Express kütüphanesini projemize import ediyoruz.
const express = require("express");
const app = express();
const port = process.env.PORT || 4545; //Server portunu belirledik. Herhangi bir değişikliği de kolayca yapabiliriz.
const mongoose = require("mongoose");   // mongoose import ediyoruz MongoDB veritabanı ile bağlantı için

const bodyParser = require("body-parser");  // POST, PUT gibi http isteklerinde kullanıcıdan bilgileri genelde bodyden alırız. 
app.use(bodyParser.json());  //body-parser bu body isteklerini json halde almamızı sağlayan yardımcı bir kütüphanedir.

// enstrumanModel'e erişim için import ediyoruz.
require("./enstrumanModel");
const Enstruman = mongoose.model("Enstruman");

// veritabanı bağlantımız 
var dbURI = 'mongodb://localhost/Instruments';
mongoose.connect(dbURI, { 'useNewUrlParser': true }); 
mongoose.connection.on('connected', function () {
    console.log('Mongoose ' + dbURI+ 
      ' adresindeki veritabanına bağlandı\n');
  });

//Ekle fonksiyonu
app.post("/enstruman", (req,res) => {
    var newEnstruman = {
        Tür : req.body.Tür,
        Marka : req.body.Marka,
        Fiyat: req.body.Fiyat,
        Satıcı :req.body.Satıcı
    }
    // Enstruman nesnesi oluşturduk.
    var enstruman = new Enstruman(newEnstruman);
    enstruman.save().then(() => {
        console.log("Veritabanına eklendi...");
    }).catch((error) => {
        if(error){
            throw error;
        }
    });
 res.send("Başarılı!");
});

// Listele fonksiyonu
app.get("/enstruman1", (req,res) => {
    Enstruman.find().then((enstrumanlar) => {
       res.json(enstrumanlar);
    }).catch((error) => {
        if(error){
            throw error;
        }
    });
});

// Tek bir Enstrümanı ID'ye göre listelemek
app.get("/enstruman/:id", (req,res) => {
    //ID'yi parametre olarak fonksiyona gönderiyoruz
    Enstruman.findById(req.params.id).then((enstruman) => {
        if(enstruman){
            res.json(enstruman);
        }
    }).catch(error => {
        if(error){
            res.status(400).send("Geçersiz ID !");;
        }
    });
});

// Sil fonksiyonu 
app.delete("/enstruman/:id", (req,res) => {
    Enstruman.findByIdAndRemove(req.params.id).then(() => {
        res.send("Veritabanından Silindi...");
         }).catch(error => {
             if(error){
                res.status(400).send(" Silinemedi !");;
             }
         });

});

app.get('/', (req,res) => {
    res.send("Anasayfa");
});
// Server port aktifleştirme
app.listen(port, () => {
    console.log(`localhost:${port} -> üzerinden Enstrüman server'a ulaşabilirisiniz...`);
});