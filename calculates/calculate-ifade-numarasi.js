document.addEventListener("DOMContentLoaded", function () {
    let ifadeNumarasiData;

    // JSON dosyasını yükle
    fetch('./calculates/calculate-ifade-numarasi-result.json')
        .then(response => response.json())
        .then(data => {
            ifadeNumarasiData = data;
            console.log("Yüklenen İfade Numarası Verisi:", ifadeNumarasiData);
        })
        .catch(error => console.error('JSON dosyası yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById('calculate-ifade-numarasi-button').addEventListener('click', function () {
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();

        if (!name || !surname) {
            alert("Lütfen isim ve soyisminizi girin.");
            return;
        }

        // İfade numarasını hesapla (isim ve soyismin ilk harfi)
        const ifadeNumarasi = hesaplaIfadeNumarasi(name, surname);
        console.log("Hesaplanan İfade Numarası:", ifadeNumarasi);

        displayIfadeNumarasiResult(ifadeNumarasi);
    });

    // İfade numarasını hesaplama fonksiyonu
    function hesaplaIfadeNumarasi(name, surname) {
        const firstLetterName = name[0].toUpperCase();
        const firstLetterSurname = surname[0].toUpperCase();
        return getLetterNumber(firstLetterName) + getLetterNumber(firstLetterSurname);
    }

    // Harfe karşılık gelen numarayı bulma fonksiyonu
    function getLetterNumber(letter) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet.indexOf(letter) + 1;
    }

    // Sonucu ekranda gösterme fonksiyonu
    function displayIfadeNumarasiResult(ifadeNumarasi) {
        const resultElement = document.getElementById('ifadeNumarasiResult');
        const descriptionElement = document.getElementById('ifadeNumarasiDescription');
        const resultData = ifadeNumarasiData[ifadeNumarasi.toString()];

        if (resultData) {
            resultElement.textContent = ifadeNumarasi; // İfade numarası
            descriptionElement.textContent = resultData.description; // İfade numarası açıklaması

            // Formu gizle ve tabloyu göster
            document.getElementById('ifadeNumarasiForm').style.display = 'none';
            document.getElementById('ifadeNumarasiTable').style.display = 'table';
        } else {
            console.error("Sonuç bulunamadı:", ifadeNumarasi);
            resultElement.textContent = "Sonuç bulunamadı.";
            descriptionElement.textContent = "";
            document.getElementById('ifadeNumarasiTable').style.display = 'table';
        }
    }
});