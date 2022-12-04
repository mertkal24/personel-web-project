$(document).on('click', '.Mail', function () {
    var id = $(this).attr('id');
    $.ajax({
        url: '/Mesajlar/MailJson',
        type: 'post',
        dataType: 'json',
        data: { 'id': id },
        success: async function (veri) {
            const { value: formValues } = await Swal.fire({
                title: 'Mail Gönder',
                showCancelButton: true,
                cancelButtonText: 'Vazgeç',
                cancelButtonColor: '#d43f3a',
                confirmButtonColor: '#337ab7',
                confirmButtonText: 'Onayla',
                html:
                    '<label>Kişi Adı</label>' +
                    '<textarea id="AD" class="swal2-input"' + 'value="' + veri.Result.Ad + '">' + veri.Result.Ad + '</textarea>' +
                    '<label>Kişi Email Adresi</label>' +
                    '<textarea id="EMAİL" class="swal2-input"' + 'value="' + veri.Result.email + '">' + veri.Result.email + '</textarea>' +
                    '<label>Mesaj</label>' +
                    '<textarea id="MSG" class="swal2-input"' + 'value="Mesajınız"></textarea>',

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('AD').value,
                        document.getElementById('EMAİL').value,
                        document.getElementById('MSG').value

                    ]
                }

            });

            $.ajax({
                url: '/Mesajlar/MailJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'MSG': formValues[2] },
                success: function (dgr) {
                    if (dgr == '1') {
                        Swal.fire({
                            type: 'success',
                            title: 'Mail Yollama İşlemi Başarılı',
                            text: 'İyi Çalışmalar!',


                        })
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Güncellenmedi!',
                            text: 'Bir Hata Oluştu!'
                        })
                    }
                }
            })
        }
    })


});