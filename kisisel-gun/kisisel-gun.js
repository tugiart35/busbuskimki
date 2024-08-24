document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Formun varsayılan gönderimini engelle

    // Formdan verileri al
    var birthdate = document.getElementById('birthdate1').value;

    // Doğum tarihinin boş olup olmadığını kontrol et
    if (!birthdate) {
        console.error("Doğum tarihi boş.");
        document.getElementById('personal-day-description').innerText = 'Lütfen doğum tarihinizi girin.';
        return;
    }

    // Kişisel gün hesaplama
    var personalDay = calculatePersonalDay(birthdate); 

    if (isNaN(personalDay)) {
        console.error("Geçersiz kişisel gün hesaplaması:", personalDay);
        document.getElementById('personal-day-description').innerText = 'Geçersiz tarih girişi. Lütfen doğru bir tarih girin.';
        return;
    }

    // JSON verisiyle sonuçları gösterme
    fetch('kisisel-gun/kisisel-gun-result.json')
        .then(response => response.json())
        .then(data => {
            var result = data[personalDay];
            console.log("Hesaplanan Kişisel Gün:", personalDay);
            console.log("JSON Verisi:", data);

            if (result) {
                document.getElementById('personal-day-description').innerText = result.description;
                var imgElement = document.getElementById('personal-day-image');
                imgElement.src = result.image_url;
                imgElement.style.display = 'block';  // Resmi göster
                
                // Formu gizle
                document.getElementById('infoForm').style.display = 'none';
            } else {
                document.getElementById('personal-day-description').innerText = 'Bir hata oluştu.';
                document.getElementById('personal-day-image').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('JSON dosyası yüklenirken bir hata oluştu:', error);
            document.getElementById('personal-day-description').innerText = 'JSON dosyası yüklenirken bir hata oluştu.';
            document.getElementById('personal-day-image').style.display = 'none';
        });
});

// Kişisel Gün Hesaplama Fonksiyonu
function calculatePersonalDay(birthdate) {
    // Doğum tarihi değerini doğru şekilde al
    var birthDateObj = new Date(birthdate + 'T00:00:00');  // Zaman dilimi hatalarını engellemek için UTC moduna alıyoruz

    // Geçersiz tarih kontrolü
    if (isNaN(birthDateObj.getTime())) {
        console.error("Geçersiz doğum tarihi:", birthdate);
        return NaN;
    }

    var day = birthDateObj.getUTCDate();
    var month = birthDateObj.getUTCMonth() + 1; // Aylar 0'dan başlar, bu yüzden +1 ekliyoruz
    var year = birthDateObj.getUTCFullYear();

    console.log("Doğum tarihi - Gün:", day, "Ay:", month, "Yıl:", year);  // Konsolda gün, ay ve yılı kontrol et

    var personalDay = day + month + year;

    // Tek haneli sayıya indirgeme işlemi
    while (personalDay > 9) {
        personalDay = personalDay.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    return personalDay;
}