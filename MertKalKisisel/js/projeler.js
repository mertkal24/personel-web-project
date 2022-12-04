

    
$(document).on('click', '.Guncelle', async function () {
    var id = $(this).attr('id');
    $.ajax({
        url: '/Projeler/GuncJson',
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
                    '<input id="ID" value=' + veri.Result.IDProje + ' class="swal2-input" readonly="readonly" >' +
                    '<textarea id="AD" class="swal2-input"' + 'value="' + veri.Result.ProjeAd + '">' + veri.Result.ProjeAd + '</textarea>' +
                    '<textarea id="ACK" class="swal2-input"' + 'value="' + veri.Result.ProjeAciklama + '">' + veri.Result.ProjeAciklama + '</textarea>' +
                    '<input id="TRH" type="datetime-local" class="swal2-input"' + 'value="' + veri.Result.eklemetarihi + '">',

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ID').value,
                        document.getElementById('AD').value,
                        document.getElementById('ACK').value,
                        document.getElementById('TRH').value,

                    ]
                }

            });


            $.ajax({
                url: '/Projeler/GuncJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'AD': formValues[1], 'ACK': formValues[2], 'TRH': formValues[3] },
                success: function (dgr) {
                    if (dgr == '1') {
                        $('#ad-' + id).text(formValues[1]);
                        $('#ack-' + id).text(formValues[2]);
                        $('#tarih-' + id).text(formValues[3]);
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
$(document).on('click', '.FotoGuncelle', function () {
    var id = $(this).attr('id');
    $('.snd').attr('id', id);
    $('#icrk').slideUp(1000);
    $("#mk").toggle(1000);


});
$(document).on('click', '.snd', function () {
    var id = $(this).attr('id');
    if (window.FormData !== undefined) {
        var fileUpload = $("#files").get(0);
        var files = fileUpload.files;
        var fileData = new FormData();
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
            var gonder = files[i].name;
        }
        fileData.append('username', 'Faisal');
        $.ajax({
            url: '/Projeler/Foto/' + id,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            success: function (result) {
                alert(result);              
                $('#mk').hide();
                $('#icrk').slideDown(1000);
                $('#foto-' + id).attr('src', '/Foto/' + gonder);
               
            },

            error: function (err) {
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported in the browser.");
    }
});
$(document).on('click', '#Yeni', async function () { 

    const { value: formValues } = await Swal.fire({
        title: 'Yeni Ekle',
        showCancelButton: true,
        cancelButtonColor: '#d43f3a',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Ekle',
        confirmButtonColor: '#337ab7',
        html:          
                      
            '<input type="text" id="AD" placeholder="Proje Adı" class="swal2-input">'+
            '<input type="text" id="ACK" placeholder="Proje Açıklaması" class="swal2-input">' +
            '<input type="datetime-local" id="TRH" placeholder="Tarih" class="swal2-input">',
            
        focusConfirm: false,
        preConfirm: () => {
            return [               
                document.getElementById('AD').value,
                document.getElementById('ACK').value,
                document.getElementById('TRH').value,
             
            ]
        }
    })              
        $.ajax({
            url: '/Projeler/EkleJson',
            type: 'post',
            dataType: 'json',
            data: { 'AD': formValues[0], 'ACK': formValues[1], 'TRH': formValues[2]},
            success: async function (dgr) {
                if (dgr == '0') {
                    swal.fire({
                        type: 'error',
                        title: 'Eklenmedi!',
                        text: 'Bir Hata Var'

                    })

                }
                else if (dgr == '2') {
                    Swal.fire({
                        type: 'error',
                        title: 'Ekleme İşlemi Başarısız!',
                        text: 'Boş Alan Bırakmayınız'
                    })
                }

                swal.fire({
                    type: 'success',
                    title: 'Eklendi',
                    text: 'İşlem Başarıyla Gerçekleşti',

                })
                var foto = '<img  style="width:100px;height:100px"  id="foto-' + dgr + '" src=' + formValues[0] + ' />';
                var bir = '<div id="ad-' + dgr + '">' + formValues[0] + '</div>';
                var iki = '<div id="ack-' + dgr + '">' + formValues[1] + ' </div>';
                var uc = '<div id="tarih-' + dgr + '">' + formValues[2] + '</div>';
                var btn1 = '<button style="width:150px" class="btn btn-success Guncelle" id="' + dgr + '">Güncelle</button><br/> <button style="width:150px;margin-top:7%" class="btn btn-success FotoGuncelle" id="' + dgr + '">Foto Güncelle</button>';
                var btn2 = '<button class="btn btn-danger Sil" id="' + dgr + '">Sil</button>';
                var agr = '<tr id="kafa-' + dgr + '" ><td>' + dgr + '</td><td>' + foto + '</td><td>' + bir + '</td><td>' + iki + '</td><td>' + uc + '</td><td>' + btn1 + '</td><td>' + btn2 + '</td></tr>';
                $('#example1').prepend(agr);


            }


        })      
    
    
   

});
$(document).on('click', '.Sil', function () {
    var id = $(this).attr('id');   
    var yakala = '#kafa-' + id;
    $.ajax({
        url: '/Projeler/Sil/' + id,
        type: 'Post',
        dataType: 'json',
        success: function (dgr) {
            alert(dgr);
            $(yakala).hide();



        }



    });
});
$(document).ready(function () {
    $(document).on('click', '#vazgec1', function () {
        $('#mk').slideUp(1000);        
        $('#icrk').slideDown(1000);
    });


});