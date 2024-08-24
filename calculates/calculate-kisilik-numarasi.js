document.addEventListener("DOMContentLoaded", function () {
    let kisilikNumarasiData;

    // JSON dosyasını yükle
    fetch('calculates/calculate-kisilik-numarasi-result.json')
        .then(response => response.json())
        .then(data => {
            kisilikNumarasiData = data;
        })
        .catch(error => console.error('JSON dosyası yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById('calculate-kisilik-numarasi-button').addEventListener('click', function () {
        const isim = document.getElementById('kisilik-isim').value.trim();

        if (!isim) {
            alert("Lütfen isminizi girin.");
            return;
        }

        // Kişilik numarasını hesapla
        const kisilikNumarasi = hesaplaKisilikNumarasi(isim);
        displayResult(kisilikNumarasi);
    });

    // Kişilik numarasını hesaplama fonksiyonu (ilk harfin numarasını kullanır)
    function hesaplaKisilikNumarasi(isim) {
        const firstLetter = isim[0].toUpperCase();
        return getLetterNumber(firstLetter);
    }

    // İlk harfe karşılık gelen numarayı bulma fonksiyonu
    function getLetterNumber(letter) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet.indexOf(letter) + 1;
    }

    // Sonucu ekranda gösterme
    function displayResult(kisilikNumarasi) {
        const resultElement = document.getElementById('kisilikNumarasiResult');
        const descriptionElement = document.getElementById('kisilikNumarasiDescription');
        const resultData = kisilikNumarasiData[kisilikNumarasi.toString()];

        if (resultData) {
            resultElement.textContent = kisilikNumarasi; // Kişilik numarası
            descriptionElement.textContent = resultData.description; // Kişilik numarası açıklaması

            // Formu gizle ve tabloyu göster
            document.getElementById('kisilikNumarasiForm').style.display = 'none';
            document.getElementById('kisilikNumarasiTable').style.display = 'table';
        } else {
            resultElement.textContent = "Sonuç bulunamadı.";
            descriptionElement.textContent = "";
            document.getElementById('kisilikNumarasiTable').style.display = 'none';
        }
    }
});