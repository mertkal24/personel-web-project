
$(document).on('click', '#Sifirla', async function () {
    const { value: formValues } = await Swal.fire({

        title: 'Şifre Sıfırlama',
        showCancelButton: true,
        cancelButtonText: 'Vazgeç',
        cancelButtonColor: '#d43f3a',
        confirmButtonColor: '#337ab7',
        confirmButtonText: 'Onayla',
        html:    
            '<input id="POSTA" type="email" required="required" placeholder="Email Adresinizi Giriniz"  class="swal2-input" >',          

        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('POSTA').value,
               

            ]
        }

    });    
    $.ajax({
        url: '/Login/ResetJson',
        type: 'Post',
        dataType: 'json',
        data: { 'POSTA': formValues[0] },
        success: function (dgr) {
            if (dgr == '1') {
                Swal.fire({
                    type: 'success',
                    title: 'Başarılı',
                    text: 'Yeni Şifreniz Email Adresinize Yollandı!',
                })
            }
            if (dgr == '0') {
                Swal.fire({
                    type: 'error',
                    title: 'İşlem Başarısız',
                    text: 'Bu Email Adresine Sahip Bir Admin Bulunmamaktadır!',
                })
            }
        }

    })



});