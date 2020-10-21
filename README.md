# Müzik Market -> Node.js/Express.js/MongoDB/Postman Mikroservis Çalışması #

**Mikroservis Mimarisi** için kısaca, bir Monolog sistemin alt sistemlere bölünerek kontrol edilmesidir diyebiliriz.

**Mikroservis Mimarisi**nin mantığını anlamak için temel bir proje çalışması yaptım. 
Proje bünyesinde 3 ayrı veritabanına bağlı 3 servis bulunmaktadır.
Müşteriler, Enstrümanlar ve Siparişler servisleri ile temel CRUD işlemlerini yani ekle,sil,güncelle ve listele işlemlerini yapabiliyoruz.
3 server aynı anda çalıştığında Sipariş servisinde parametre olarak gelen Müşteri ve Enstrüman ID'leri ile hangi müşterinin ne sipariş verdiğini görüntüleyebiliyoruz.
POST,PUT,GET,DELETE fonskiyonları ve gelen parametreler ile işlemlerimi Postman uygulaması üzerinden gerçekleştirdim.


