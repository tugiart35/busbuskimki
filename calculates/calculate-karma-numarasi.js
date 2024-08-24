document.addEventListener("DOMContentLoaded", function () {
  let karmaData;

  // JSON dosyasını yükle
  fetch('./calculates/calculate-karma-numarasi-result.json')
      .then(response => response.json())
      .then(data => {
          karmaData = data;
      })
      .catch(error => console.error('JSON dosyası yüklenemedi:', error));

  // Hesapla butonuna tıklama olayını dinle
  document.getElementById('calculate-karma-numarasi-button').addEventListener('click', function () {
      const name = document.getElementById('karma-name').value.trim().toUpperCase();
      const surname = document.getElementById('karma-surname').value.trim().toUpperCase();

      if (!name || !surname) {
          alert("Lütfen isim ve soyisminizi girin.");
          return;
      }

      // Karma numarasını hesapla (isimde olmayan harflerin numerolojik değerlerinin toplamı)
      const karmaNumarasi = hesaplaKarmaNumarasi(name, surname);
      displayKarmaNumarasiResult(karmaNumarasi);
  });

  // Karma numarasını hesaplama fonksiyonu
  function hesaplaKarmaNumarasi(name, surname) {
      const fullName = name + surname;
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const letterValues = {
          'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 1, 'K': 2, 
          'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'U': 3, 
          'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
      };

      let totalKarmaValue = 0;

      // Alfabetik olarak her harfi kontrol et, isimde olmayanların değerini ekle
      for (let i = 0; i < alphabet.length; i++) {
          const letter = alphabet[i];
          if (!fullName.includes(letter)) {
              totalKarmaValue += letterValues[letter];
          }
      }

      return tekBasamagaIndir(totalKarmaValue); // Tek basamağa indir
  }

  // Tek basamağa indirgeme fonksiyonu
  function tekBasamagaIndir(number) {
      while (number > 9 && number !== 11 && number !== 22) {
          number = number.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
      }
      return number;
  }

  // Sonucu ekranda gösterme fonksiyonu
  function displayKarmaNumarasiResult(karmaNumarasi) {
      const resultElement = document.getElementById('karmaNumarasiResult');
      const descriptionElement = document.getElementById('karmaNumarasiDescription');
      const resultData = karmaData[karmaNumarasi.toString()];

      if (resultData) {
          resultElement.textContent = karmaNumarasi; // Karma numarası
          descriptionElement.textContent = resultData.description; // Karma açıklaması

          // Formu gizle ve tabloyu göster
          document.getElementById('karmaNumarasiForm').style.display = 'none';
          document.getElementById('karmaNumarasiTable').style.display = 'table';
      } else {
          resultElement.textContent = "Sonuç bulunamadı.";
          descriptionElement.textContent = "";
          document.getElementById('karmaNumarasiTable').style.display = 'table';
      }
  }
});