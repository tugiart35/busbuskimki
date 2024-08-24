document.addEventListener("DOMContentLoaded", function () {
    let kisiselYilData;

    // JSON dosyasını yükle
    fetch('./calculates/calculate-kisisel-yil-result.json')
        .then(response => response.json())
        .then(data => {
            kisiselYilData = data;
            console.log("JSON Verisi Yüklendi:", kisiselYilData);  // JSON verisinin yüklendiğini doğrulayın
        })
        .catch(error => console.error('JSON verisi yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById('calculateKisiselYilButton').addEventListener('click', function () {
        const dob = document.getElementById('dobKisiselYil').value;

        if (!dob) {
            alert("Lütfen doğum tarihinizi giriniz.");
            return;
        }

        // Tarihi ayrıştırma
        const dateParts = dob.split("-");
        const day = dateParts[2];
        const month = dateParts[1];
        const currentYear = new Date().getFullYear().toString();

        // Kişisel yılı hesapla
        const kisiselYil = calculateKisiselYil(day, month, currentYear);
        console.log("Hesaplanan Kişisel Yıl:", kisiselYil);

        // Sonucu göster
        displayKisiselYilResult(kisiselYil);
    });

    // Kişisel yıl hesaplama fonksiyonu
    function calculateKisiselYil(day, month, year) {
        // Gün ve ayı birleştirip toplamını hesapla
        const birthDayMonth = day + month;
        const total = birthDayMonth.split('').reduce((acc, digit) => acc + parseInt(digit), 0) +
                      year.split('').reduce((acc, digit) => acc + parseInt(digit), 0);

        // Tek basamağa indirgeme
        let kisiselYil = total;
        while (kisiselYil > 9) {
            kisiselYil = kisiselYil.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        }

        return kisiselYil;
    }

    // Sonucu ekranda gösterme fonksiyonu
    function displayKisiselYilResult(kisiselYil) {
        const formElement = document.getElementById('kisiselYilCalculationForm');
        const tableElement = document.getElementById('kisiselYilTable');
        const yilResultElement = document.getElementById('kisiselYilResult');
        const descriptionElement = document.getElementById('kisiselYilDescription');
        const resultData = kisiselYilData ? kisiselYilData[kisiselYil.toString()] : null;

        console.log("Gösterilecek Kişisel Yıl Verisi:", resultData);  // Doğru veri çekildi mi kontrol edin

        if (resultData) {
            yilResultElement.textContent = kisiselYil; // Kişisel yıl
            descriptionElement.textContent = resultData.description; // Kişisel yılın açıklaması

            // Formu gizle ve tabloyu göster
            formElement.style.display = 'none';
            tableElement.style.display = 'table';
        } else {
            yilResultElement.textContent = "Sonuç bulunamadı.";
            descriptionElement.textContent = "";

            // Formu gizle ve tabloyu göster
            formElement.style.display = 'none';
            tableElement.style.display = 'table';
        }
    }
});