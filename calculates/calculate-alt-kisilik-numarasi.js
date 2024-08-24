document.addEventListener("DOMContentLoaded", function () {
    let altKisilikData;

    // JSON dosyasını yükle
    fetch('./calculates/calculate-alt-kisilik-numarasi-result.json')
        .then(response => response.json())
        .then(data => {
            altKisilikData = data;
        })
        .catch(error => console.error('JSON dosyası yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById('calculate-alt-kisilik-button').addEventListener('click', function () {
        const name = document.getElementById('alt-kisilik-name').value.trim();

        if (!name) {
            alert("Lütfen isminizi girin.");
            return;
        }
        try {
            // Örnek: Script'inizin içeriği
            document.getElementById('calculate-alt-kisilik-button').addEventListener('click', function() {
                console.log("Hesapla butonuna tıklandı.");
                // Hesaplama fonksiyonları vb.
            });
        } catch (error) {
            console.error("Script sırasında bir hata oluştu:", error);
        }
        // Alt Kişilik numarasını hesapla (ismin ilk harfi)
        const altKisilikNumarasi = hesaplaAltKisilikNumarasi(name);
        displayAltKisilikResult(altKisilikNumarasi);
    });

    // Alt Kişilik numarasını hesaplama fonksiyonu (ismin ilk harfi ile)
    function hesaplaAltKisilikNumarasi(name) {
        const firstLetter = name[0].toUpperCase(); // İlk harfi büyük harfe çevir
        return getLetterNumber(firstLetter);
    }

    // Harfe karşılık gelen numarayı bulma fonksiyonu
    function getLetterNumber(letter) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet.indexOf(letter) + 1; // Harfin sırasını bul ve 1 ekle
    }

    // Sonucu ekranda gösterme fonksiyonu
    function displayAltKisilikResult(altKisilikNumarasi) {
        const resultElement = document.getElementById('altKisilikResult');
        const descriptionElement = document.getElementById('altKisilikDescription');
        const resultData = altKisilikData[altKisilikNumarasi.toString()];

        if (resultData) {
            resultElement.textContent = altKisilikNumarasi; // Alt Kişilik numarası
            descriptionElement.textContent = resultData.description; // Alt Kişilik açıklaması

            // Formu gizle ve tabloyu göster
            document.getElementById('altKisilikForm').style.display = 'none';
            document.getElementById('altKisilikTable').style.display = 'table';
        } else {
            resultElement.textContent = "Sonuç bulunamadı.";
            descriptionElement.textContent = "";
            document.getElementById('altKisilikTable').style.display = 'table';
        }
        function someFunction() {
            try {
                // Hata verebilecek kodlar burada
                let result = somePotentiallyFaultyCode();
                console.log(result);
            } catch (error) {
                console.error("someFunction içinde bir hata oluştu:", error);
            }
        }
        try {
    // Örnek: Script'inizin içeriği
    document.getElementById('calculate-button').addEventListener('click', function() {
        console.log("Hesapla butonuna tıklandı.");
        // Hesaplama fonksiyonları vb.
    });
} catch (error) {
    console.error("Script sırasında bir hata oluştu:", error);

}
    }
});

