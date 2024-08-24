document.addEventListener("DOMContentLoaded", function () {
    let kisiselAyResults;

    // JSON dosyasını yükle
    fetch('./calculates/calculate-kisisel-ay-result.json')
        .then(response => response.json())
        .then(data => {
            kisiselAyResults = data;
            console.log("JSON Verisi Yüklendi:", kisiselAyResults);
        })
        .catch(error => console.error('JSON verisi yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById("calculateKisiselAyButton").addEventListener("click", function () {
        const dob = document.getElementById("dobKisiselAy").value;

        // Doğum tarihi boşsa veya hatalıysa uyarı göster
        if (!dob) {
            alert("Lütfen doğum tarihinizi giriniz.");
            return;
        }

        // Tarihi ayrıştırma
        const dateParts = dob.split("-");
        if (dateParts.length !== 3) {
            alert("Lütfen geçerli bir doğum tarihi giriniz (YYYY-AA-GG formatında).");
            return;
        }

        const day = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Şu anki ay (1-12 arasında)

        // Kişisel yılı hesapla
        const kisiselYil = calculateKisiselYil(day, month, currentYear);

        // Kişisel ayı hesapla
        const kisiselAy = calculateKisiselAy(kisiselYil, currentMonth);

        // Sonucu göster
        displayKisiselAyResult(kisiselAy);
    });

    // Kişisel Yıl hesaplama fonksiyonu
    function calculateKisiselYil(day, month, year) {
        // Gün ve ayı birleştirip toplamını hesapla
        const birthDayMonth = day + month;
        const total = birthDayMonth.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0) +
                      year.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

        // Tek basamağa indir
        let kisiselYil = total;
        while (kisiselYil > 9) {
            kisiselYil = kisiselYil.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }

        return kisiselYil;
    }

    // Kişisel Ay hesaplama fonksiyonu
    function calculateKisiselAy(kisiselYil, currentMonth) {
        let total = kisiselYil + currentMonth;

        // Tek basamağa indir
        total = reduceToSingleDigit(total);

        return total;
    }

    // Tek basamağa indirgeme fonksiyonu
    function reduceToSingleDigit(num) {
        // Eğer 11 veya 22 değilse tek basamağa indir
        while (num > 9 && num !== 11 && num !== 22) {
            num = num.toString().split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return num;
    }

    // Sonucu ekranda gösterme fonksiyonu
    function displayKisiselAyResult(kisiselAy) {
        const formElement = document.getElementById('kisiselAyForm');
        const tableElement = document.getElementById('kisiselAyTable');
        const resultElement = document.getElementById('kisiselAyResult');
        const descriptionElement = document.getElementById('kisiselAyDescription');
        const resultData = kisiselAyResults ? kisiselAyResults[kisiselAy.toString()] : null;

        if (resultData) {
            resultElement.textContent = kisiselAy; // Kişisel ay numarası
            descriptionElement.textContent = resultData.description; // Kişisel ay açıklaması

            // Formu gizle ve tabloyu göster
            formElement.style.display = 'none';
            tableElement.style.display = 'table';
        } else {
            resultElement.textContent = "Sonuç bulunamadı.";
            descriptionElement.textContent = "";

            // Formu gizle ve tabloyu göster
            formElement.style.display = 'none';
            tableElement.style.display = 'table';
        }
    }
});