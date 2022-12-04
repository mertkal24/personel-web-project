$(document).on('click', '.Sil', function () {
    var id = $(this).attr("id");
    $.ajax({
        url: '/Adminler/Sil/' + id,
        type: 'Post',
        dataType: 'json',
        success: function (dgr) {            
            $('#kafa-' + id).slideUp(1000);
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
        url: '/Adminler/GuncJson',
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
                    '<input id="ID" value=' + veri.Result.Id + ' class="swal2-input" readonly="readonly" >' +
                    '<label>Admin Kullanıcı Adı</label>' +
                    '<input type="text" id="KAD" value=' + veri.Result.AdminKullaniciAdi + ' class="swal2-input"  >' +
                    '<label>Şifre</label>' +
                    '<input type="text" id="SIF" value=' + veri.Result.Sifre + ' class="swal2-input"  >' +
                    '<label>Google Hesabı</label>' +
                    '<input type="text" id="GOG" value=' + veri.Result.googlehesap + ' class="swal2-input"  >' +
                    '<label>Email</label>' +
                    '<input type="text" id="POSTA" value=' + veri.Result.email + ' class="swal2-input"  >' +
                    '<label>Facebook Hesabı</label>' +
                    '<input type="text" id="FACE" value=' + veri.Result.facebook + ' class="swal2-input"  >' +
                    '<label>İnstagram Hesabı</label>' +
                    '<input type="text" id="INSTA" value=' + veri.Result.İnstagram + ' class="swal2-input"  >' +
                    '<label>Twitter Hesabı</label>' +
                    '<input type="text" id="TWIT" value=' + veri.Result.Twitter + ' class="swal2-input"  >',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ID').value,
                        document.getElementById('KAD').value,
                        document.getElementById('SIF').value,
                        document.getElementById('GOG').value,
                        document.getElementById('POSTA').value,
                        document.getElementById('FACE').value,
                        document.getElementById('INSTA').value,
                        document.getElementById('TWIT').value,

                    ]
                }

            });


            $.ajax({
                url: '/Adminler/GuncJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'KAD': formValues[1], 'SIF': formValues[2], 'GOG': formValues[3], 'POSTA': formValues[4], 'FACE': formValues[5], 'INSTA': formValues[6], 'TWIT': formValues[7] },
                success: function (dgr) {
                    $('.' + id).html('<td>' + id + '</td><td>' + formValues[1] + '</td><td><button id=' + id + ' class="btn btn-success Guncelle">Güncelle</button></td><td><button id=' + id + ' class="btn btn-danger sll">Sil</button></td>');
                    if (dgr == '1') {
                        Swal.fire({
                            type: 'success',
                            title: 'Güncellendi',
                            text: 'İşlem başarılı!',

                        })
                        $('#ad-' + id).text(formValues[1]);
                        $('#sifre-' + id).text(formValues[2]);
                        $('#google-' + id).text(formValues[3]);
                        $('#email-' + id).text(formValues[4]);
                        $('#face-' + id).text(formValues[5]);
                        $('#insta-' + id).text(formValues[6]);
                        $('#twit-' + id).text(formValues[7]);


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
    $(document).on('click', '#Yeni', async function () {
        const { value: formValues } = await Swal.fire({
            title: 'Yeni Ekle',
            showCancelButton: true,
            cancelButtonColor: '#d43f3a',
            cancelButtonText: 'İptal',
            confirmButtonText: 'Ekle',
            confirmButtonColor: '#337ab7',
            html:
                '<input required="required" id="KAD" placeholder="Kullanıcı Adı" class="swal2-input">'+
                '<input type="passaword" id="SIF" placeholder="Şifre" class="swal2-input">' +
                '<input type="email" id="GOOG" placeholder="Google Hesap" class="swal2-input">' +
                '<input type="text" id="POSTA" placeholder="Email" class="swal2-input">' +
                '<input type="text" id="FACE" placeholder="Facebook" class="swal2-input">' +
                '<input type="text" id="INSTA" placeholder="İnstagram" class="swal2-input">' +
                '<input  type="text" id="TWIT" placeholder="Twitter" class="swal2-input">',

            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('KAD').value,
                    document.getElementById('SIF').value,
                    document.getElementById('GOOG').value,
                    document.getElementById('POSTA').value,
                    document.getElementById('FACE').value,
                    document.getElementById('INSTA').value,
                    document.getElementById('TWIT').value,
                ]
            }
        })
        $.ajax({
            url: '/Adminler/EkleJson',
            type: 'post',
            dataType: 'json',
            data: { 'KAD': formValues[0], 'SIF': formValues[1], 'GOOG': formValues[2], 'POSTA': formValues[3], 'FACE': formValues[4], 'INSTA': formValues[5], 'TWIT': formValues[6] },
            success: async function (dgr) {              
                 if (dgr == '2') {
                    Swal.fire({
                        type: 'error',
                        title: 'Ekleme İşlemi Başarısız!',
                        text: 'Boş Alan Bırakmayınız'
                    })
                }
                else {
                     swal.fire({
                         type: 'success',
                         title: 'Eklendi',
                         text: 'İşlem Başarıyla Gerçekleşti',
                     })
                     var div1 = '<div id="ad-' + dgr + '">' + formValues[0] + '</div>';
                     var div2 = '<div id="' + dgr + '">' + formValues[1] + '</div>';
                     var div3 = '<div id="' + dgr + '">' + formValues[2] + '</div>';
                     var div4 = ' <div id = "' + dgr + '" > ' + formValues[3] + '</div>';
                     var div5 = '<div id="' + dgr + '">' + formValues[4] + '</div>';
                     var div6 = '<div id="' + dgr + '">' + formValues[5] + '</div>';
                     var btn1 = '<a class="btn btn-info Guncelle" id="' + dgr + '">Güncelle</a>';
                     var btn2 = '<a class="btn btn-danger Sil" id="' + dgr + '">Sil</a>';
                     var agr = '<tr id="kafa-' + dgr + '"><td>' + dgr + '</td><td>' + div1 + '</td><td>' + div2 + '</td><td>' + div3 + '</td><td>' + div4 + '</td><td>' + div5 + '</td><td>' + div6 + '</td><td>' + btn1 + '</td><td>' + btn2 + '</td>  </tr>';
                     $('#kayitlar').prepend(agr);


                }
            }


        })



    });
})