document.addEventListener("DOMContentLoaded", function () {
    let ruhIsteğiData;

    // JSON dosyasını yükle
    fetch('calculates/calculate-ruh-istegi-result.json')
        .then(response => response.json())
        .then(data => {
            ruhIsteğiData = data;
        })
        .catch(error => console.error('JSON dosyası yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById('calculate-ruh-istegi-button').addEventListener('click', function () {
        const isim = document.getElementById('ruh-istegi-isim').value.trim();
        const soyisim = document.getElementById('ruh-istegi-soyisim').value.trim();

        if (!isim || !soyisim) {
            alert("Lütfen isim ve soyisminizi girin.");
            return;
        }

        const ruhIsteğiNumarasi = hesaplaRuhIsteğiNumarasi(isim, soyisim);
        displayResult(ruhIsteğiNumarasi);
    });

    // Sesli harflerin değerlerini tanımlayan fonksiyon
    function sesliHarfDegerleri() {
        return {
            'A': 1, 'E': 5, 'I': 9, 'İ': 9, 'O': 6, 'Ö': 6, 'U': 3, 'Ü': 3,
            'a': 1, 'e': 5, 'ı': 9, 'i': 9, 'o': 6, 'ö': 6, 'u': 3, 'ü': 3
        };
    }

    // Ruh isteği numarasını hesaplama fonksiyonu
    function hesaplaRuhIsteğiNumarasi(isim, soyisim) {
        const sesliHarfDegerleriMap = sesliHarfDegerleri();
        const isimFull = (isim + soyisim).toUpperCase(); // Tam ismi büyük harflere çevir

        let toplam = 0;

        // Harflerin değerlerini toplama
        for (let i = 0; i < isimFull.length; i++) {
            const harf = isimFull[i];
            if (sesliHarfDegerleriMap[harf]) {
                toplam += sesliHarfDegerleriMap[harf];
            }
        }

        return tekBasamagaIndir(toplam); // Tek basamağa indir
    }

    // Tek basamağa indirgeme fonksiyonu
    function tekBasamagaIndir(number) {
        while (number > 9 && number !== 11 && number !== 22) {
            number = number.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
        return number;
    }

// Sonucu ekranda gösterme fonksiyonu
function displayResult(ruhIsteğiNumarasi) {
    const resultTable = document.getElementById('ruhIsteğiResult');
    const resultNumarasiElement = document.getElementById('ruhIsteğiNumarasi');
    const descriptionElement = document.getElementById('ruhIsteğiDescription');
    const resultData = ruhIsteğiData[ruhIsteğiNumarasi];

    if (resultData) {
        resultNumarasiElement.textContent = ruhIsteğiNumarasi; // Ruh isteği numarasını yazdır
        descriptionElement.textContent = resultData.description; // Açıklamayı yazdır

        // Tabloyu göster
        resultTable.style.display = 'table';

        // Formu gizle
        document.getElementById('ruhIsteğiForm').style.display = 'none';
    } else {
        resultNumarasiElement.textContent = "Sonuç bulunamadı.";
        descriptionElement.textContent = "";
        resultTable.style.display = 'table'; // Boş bir sonuç olsa bile tabloyu göster
    }
}
});