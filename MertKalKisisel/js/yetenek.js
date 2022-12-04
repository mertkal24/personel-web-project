$(document).on('click', '.sll', function () {
    var id = $(this).attr("id");
    $.ajax({
        url: '/Yetenekler/Sil/' + id,
        type: 'Post',
        dataType: 'json',
        success: function (dgr) {
            var yakala = '.' + id;
            $(yakala).slideUp(1000);
            if (dgr == '1') {
                Swal.fire({
                    type: 'success',
                    title: 'Güncellendi',
                    text: 'İşlem başarılı!',

                })
            }
        }
    });
});
$(document).on('click', '.Guncelle', function () {
    var id = $(this).attr('id');   
    $.ajax({
        url: '/Yetenekler/GuncJson',
        type: 'post',
        dataType: 'json',
        data: { 'id': id },
        success: async function (veri) {
            const { value: formValues } = await Swal.fire({

                title: 'Güncelleme',
                showCancelButton: true,
                cancelButtonText: 'Vazgeç',
                cancelButtonColor: '#d43f3a',
                confirmButtonColor: '#337ab7',
                confirmButtonText: 'Onayla',
                html:
                    '<label>ID</label>' +
                    '<input id="ID" value=' + veri.Result.YetenekID + ' class="swal2-input" readonly="readonly" >' +
                    '<label>Yetenek Adı</label>' +
                    '<textarea id="YET" class="swal2-input"' + 'value="' + veri.Result.YetenekAdi + '">' + veri.Result.YetenekAdi + '</textarea>',

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ID').value,
                        document.getElementById('YET').value,

                    ]
                }

            });


            $.ajax({
                url: '/Yetenekler/GuncJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'YET': formValues[1] },
                success: function (dgr) {
                    $('.' + id).html('<td>' + id + '</td><td>' + formValues[1] + '</td><td><button id=' + id +' class="btn btn-success Guncelle">Güncelle</button></td><td><button id='+ id +' class="btn btn-danger sll">Sil</button></td>');
                    if (dgr == '1') {                     
                        Swal.fire({
                            type: 'success',
                            title: 'Güncellendi',
                            text: 'İşlem başarılı!',

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
$(document).ready(function () {
    $(document).on('click', '#yeni', async function () {
        const { value: formValues } = await Swal.fire({
            title: 'Yeni Ekle',
            showCancelButton: true,
            cancelButtonColor: '#d43f3a',
            cancelButtonText: 'İptal',
            confirmButtonText: 'Ekle',
            confirmButtonColor: '#337ab7',
            html:
                '<input required="required" id="YET" placeholder="Yeteneğinizi Buraya Yazın" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('YET').value,
                ]
            }
        })
        $.ajax({
            url: '/Yetenekler/EkleJson',
            type: 'post',
            dataType: 'json',
            data: { 'YET': formValues[0] },
            success: async function (dgr) {
                if (dgr == '1') {
                    swal.fire({
                        type: 'success',
                        title: 'Eklendi',
                        text: 'İşlem Başarıyla Gerçekleşti',
                    })
                   //Tabloyu Yeniden Yükletmeyi Kap
                    
                }
                else if (dgr == '2') {
                    Swal.fire({
                        type: 'error',
                        title: 'Ekleme İşlemi Başarısız!',
                        text: 'Boş Alan Bırakmayınız'
                    })
                }
                else {
                    swal.fire({
                        type: 'error',
                        title: 'Eklenmedi!',
                        text: 'Bir Hata Var'

                    })

                }
            }


        })



    });
})



