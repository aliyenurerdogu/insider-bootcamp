const firstName = prompt('Adınız nedir?');
const age = prompt('Yaşınız kaç?');
const job = prompt('Mesleğiniz nedir?');

const person = {
    name: firstName,
    age: age,
    job: job
};

console.log("Kullanıcı Bilgileri:", person);


const products = [
    { name: "Telefon", price: 5000 },
    { name: "Bilgisayar", price: 15000 },
    { name: "Kamera", price: 8000 },
    { name: "Tablet", price: 4000 }
];

let sepet = [];

function sepeteEkle(urunAdi) {
    const urun = products.find(p => p.name === urunAdi);
    if (urun) {
        sepet.push(urun);
        console.log(`${urun.name} sepete eklendi.`);
        console.log(`Ürünün Fiyatı: ${urun.price} TL`);
    } else {
        console.log("Ürün bulunamadı.");
    }
}

function sepettenCikar(urunAdi) {
    const index = sepet.findIndex(p => p.name === urunAdi);
    if (index !== -1) {
        const cikarilanUrun = sepet.splice(index, 1)[0];
        console.log(`${cikarilanUrun.name} sepetten çıkarıldı.`);
    } else {
        console.log("Ürün bulunamadı.");
    }
}

function sepetToplam() {
    const toplam = sepet.reduce((acc, urun) => acc + urun.price, 0);
    console.log(`Sepet Toplamı: ${toplam} TL`);
    return toplam;
}

function sepetiListele() {
    console.log("Sepetinizdeki Ürünler:");
    sepet.forEach((urun, index) => {
        console.log(`${index + 1}. ${urun.name} - ${urun.price} TL`);
    });
}

while (true) {
    const urun = prompt(
        "Sepete eklemek istediğiniz ürünü girin: (Telefon, Bilgisayar, Kamera, Tablet)\n" +
        "Çıkmak için 'q' tuşuna basın."
    );

    if (urun === 'q' || urun === null) {
        console.log("Sepete ekleme işlemi tamamlandı.");
        break;
    }

    sepeteEkle(urun);
}

sepetiListele();

sepetToplam();

while (true) {
    const urun = prompt(
        "Sepetten çıkarmak istediğiniz ürünü girin:\n" +
        "Çıkmak için 'q' tuşuna basın."
    );

    if (urun === 'q' || urun === null) {
        console.log("Sepetten çıkarma işlemi tamamlandı.");
        break;
    }

    sepettenCikar(urun);
}

sepetiListele();

sepetToplam();

