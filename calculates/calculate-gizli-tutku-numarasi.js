document.addEventListener("DOMContentLoaded", function () {
    let gizliTutkuData;

    // JSON dosyasını yükle
    fetch('./calculates/calculate-gizli-tutku-numarasi-result.json')
        .then(response => response.json())
        .then(data => {
            gizliTutkuData = data;
        })
        .catch(error => console.error('JSON dosyası yüklenemedi:', error));

    // Hesapla butonuna tıklama olayını dinle
    document.getElementById('calculate-gizli-tutku-button').addEventListener('click', function () {
        const name = document.getElementById('gizli-tutku-name').value.trim();

        if (!name) {
            alert("Lütfen isminizi girin.");
            return;
        }

        // Gizli Tutku numarasını hesapla
        const gizliTutkuNumarasi = hesaplaGizliTutkuNumarasi(name);
        displayGizliTutkuResult(gizliTutkuNumarasi);
    });

    // Gizli Tutku numarasını hesaplama fonksiyonu
    function hesaplaGizliTutkuNumarasi(name) {
        const letterValues = {
            'A': 1, 'B': 2, 'C': 3, 'Ç': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'Ğ': 7, 
            'H': 8, 'I': 9, 'İ': 9, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 
            'Ö': 6, 'P': 7, 'R': 9, 'S': 1, 'Ş': 1, 'T': 2, 'U': 3, 'Ü': 3, 'V': 4, 
            'Y': 7, 'Z': 8
        };

        name = name.toUpperCase();

        const letterCount = {};
        for (let i = 0; i < name.length; i++) {
            let letter = name[i];
            if (letterValues[letter]) {
                letterCount[letter] = (letterCount[letter] || 0) + 1;
            }
        }

        let maxCount = Math.max(...Object.values(letterCount));
        let totalValue = 0;
        for (let letter in letterCount) {
            if (letterCount[letter] === maxCount) {
                totalValue += letterValues[letter];
            }
        }

        return tekBasamagaIndir(totalValue); // Tek basamağa indir
    }

    // Tek basamağa indirgeme fonksiyonu
    function tekBasamagaIndir(number) {
        while (number > 9 && number !== 11 && number !== 22) {
            number = number.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
        return number;
    }

    // Sonucu ekranda gösterme fonksiyonu
    function displayGizliTutkuResult(gizliTutkuNumarasi) {
        const resultElement = document.getElementById('gizliTutkuResult');
        const descriptionElement = document.getElementById('gizliTutkuDescription');
        const resultData = gizliTutkuData[gizliTutkuNumarasi.toString()];

        if (resultData) {
            resultElement.textContent = gizliTutkuNumarasi; // Gizli Tutku numarası
            descriptionElement.textContent = resultData.description; // Gizli Tutku açıklaması

            // Formu gizle ve tabloyu göster
            document.getElementById('gizliTutkuForm').style.display = 'none';
            document.getElementById('gizliTutkuTable').style.display = 'table';
        } else {
            resultElement.textContent = "Sonuç bulunamadı.";
            descriptionElement.textContent = "";
            document.getElementById('gizliTutkuTable').style.display = 'table';
        }
    }
});