$(document).on('click', '.gncbtn', async function () {
    var id = $(this).attr('id');

    $.ajax({
        url: '/Tanitim/GuncJson',
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
                    '<input id="ID" value=' + veri.Result.ID + ' class="swal2-input" readonly="readonly" >' +
                    '<textarea  type ="text" id="AD" val="' + veri.Result.AdSoyad + '" class="swal2-input">' + veri.Result.AdSoyad + '</textarea>' +
                    '<textarea id="LISE" val="' + veri.Result.lise +'" class="swal2-input">' + veri.Result.lise + '</textarea>' +
                    '<textarea id="UNI"  val="' + veri.Result.uni +'"class="swal2-input">' + veri.Result.uni + '</textarea>' +
                    '<textarea id="UNVAN"  val="' + veri.Result.unvan + '"class="swal2-input">' + veri.Result.unvan + '</textarea>' +
                    '<textarea id="TELNO" val="' + veri.Result.telno + '"class="swal2-input">' + veri.Result.telno + '</textarea>' +
                    '<textarea id="EMAIL" val="' + veri.Result.email + '"class="swal2-input">' + veri.Result.email + '</textarea>' +
                    '<textarea id="ADRESS" val="' + veri.Result.adress + '"class="swal2-input">' + veri.Result.adress + '</textarea>',
                    

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ID').value,
                        document.getElementById('AD').value,
                        document.getElementById('LISE').value,
                        document.getElementById('UNI').value,
                        document.getElementById('UNVAN').value,
                        document.getElementById('TELNO').value,
                        document.getElementById('EMAIL').value,
                        document.getElementById('ADRESS').value,

                    ]
                }

            });  
            $.ajax({
                url: '/Tanitim/GuncJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'AD': formValues[1], 'LISE': formValues[2], 'UNI': formValues[3], 'UNVAN': formValues[4], 'TELNO': formValues[5], 'EMAIL': formValues[6], 'ADRESS': formValues[7] },
                success: function (dgr) {
                    if (dgr == '1') {
                        $('#ad-' + id).text(formValues[1]);
                        $('#lise-' + id).text(formValues[2]);
                        $('#uni-' + id).text(formValues[3]);
                        $('#unvan-' + id).text(formValues[4]);
                        $('#tel-' + id).text(formValues[5]);
                        $('#email-' + id).text(formValues[6]);
                        $('#adress-' + id).text(formValues[7]);

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
$(document).on('click', '.snd', function () {
    var id = $(this).attr('id');
    if (window.FormData !== undefined) {
        var fileUpload = $("#files").get(0);
        var files = fileUpload.files;
        var fileData = new FormData();
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
            var resim = files[i].name;
        }
        fileData.append('username', 'Faisal');
        $.ajax({
            url: '/Tanitim/Foto/' + id,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            success: function (result) {
                alert(result);                
                $('#mk').hide();
                $('#f-' + id).attr('src', "/Foto/" + resim);
                $('#icrk').slideDown(1000);
            },

            error: function (err) {
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported in the browser.");
    }
});
$(document).on('click', '.ft', function () {
    var id = $(this).attr('id');
    $('.snd').attr('id', id);
    $('#icrk').slideUp(1000);
    $("#mk").toggle(1000);


});
$(document).ready(function () {
    $(document).on('click', '#vazgec1', function () {
        $('#mk').slideUp(1000);
        $('#Cvgnc').slideUp(1000);
        $('#icrk').slideDown(1000);
    });


});
