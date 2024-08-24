// JSON dosyasını yükle
fetch('./calculates/calculate-life-path-result.json')
    .then(response => response.json())
    .then(data => {
        const lifePathResults = data;

        // Yaşam Yolu hesaplama fonksiyonu
        function calculateLifePathNumber(dob) {
            var parts = dob.split("-");
            var year = parts[0];
            var month = parts[1];
            var day = parts[2];

            // Yıl, Ay ve Gün'ü toplama işlemi
            var yearSum = year.split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
            var monthSum = month.split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
            var daySum = day.split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);

            // Tek basamağa indirme işlemi
            yearSum = reduceToSingleDigit(yearSum);
            monthSum = reduceToSingleDigit(monthSum);
            daySum = reduceToSingleDigit(daySum);

            // Yaşam yolu numarası hesaplama
            var lifePathNumber = yearSum + monthSum + daySum;

            // 11, 22, 33 kontrolü yapıldıktan sonra tek basamağa indir
            lifePathNumber = reduceToSingleDigit(lifePathNumber);

            return lifePathNumber;
        }

        // Tek basamağa indirgeme fonksiyonu
        function reduceToSingleDigit(num) {
            while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
                num = num.toString().split("").reduce((a, b) => parseInt(a) + parseInt(b), 0);
            }
            return num;
        }

        function showLifePathNumber() {
            var dob = document.getElementById("dob").value;
            if (!dob) {
                alert("Lütfen doğum tarihinizi girin.");
                return;
            }

            // Yaşam yolu numarasını hesapla
            var lifePath = calculateLifePathNumber(dob);
            console.log("Hesaplanan Yaşam Yolu Numarası:", lifePath);

            // JSON dosyasındaki sonucu göster
            var resultData = lifePathResults[lifePath] ? lifePathResults[lifePath].version1 : null;

            // Hata kontrolü
            if (!resultData) {
                document.getElementById("lifePathResult").innerText = "Sonuç bulunamadı.";
                document.getElementById("lifePathDescription").innerText = "";
            } else {
                // Sonucu göster
                document.getElementById("lifePathResult").innerText = "Yaşam Yolu Numaranız: " + lifePath;
                document.getElementById("lifePathDescription").innerText = resultData;
            }

            // Formu gizle ve tabloyu göster
            document.getElementById("lifePathForm").style.display = "none";
            document.getElementById("lifePathTable").style.display = "table";
        }

        // Hesaplama butonuna tıklama olayını dinle
        document.getElementById("calculateButton").addEventListener("click", showLifePathNumber);
    })
    .catch(error => {
        console.error('JSON dosyası yüklenemedi:', error);
    });