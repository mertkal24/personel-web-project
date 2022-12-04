
$(document).on('click', '.gncbtn', async function () {
    var id = $(this).attr('id');

    $.ajax({
        url: '/Hakkimda/GuncJson',
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
                    '<input id="ID" value=' + veri.Result.Id + ' class="swal2-input" readonly="readonly" >' +
                    '<textarea id="BASLIK" class="swal2-input"' + 'value="' + veri.Result.baslik + '">' + veri.Result.baslik + '</textarea>' +
                    '<textarea id="ack" class="swal2-input"' + 'value="' + veri.Result.aciklama + '">' + veri.Result.aciklama + '</textarea>',

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ID').value,
                        document.getElementById('BASLIK').value,
                        document.getElementById('ack').value,

                    ]
                }

            });


            $.ajax({
                url: '/Hakkimda/GuncJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'BASLIK': formValues[1], 'ack': formValues[2] },
                success: function (dgr) {
                    if (dgr == '1') {
                        var yakala1 = '#b-' + id;
                        var yakala2 = '#a-' + id;
                        $(yakala1).text(formValues[1]);
                        $(yakala2).text(formValues[2]);
                        Swal.fire({
                            type: 'success',
                            title: 'Güncellendi',
                            text: 'İşlem başarılı!',

                        })
                        Veriler();
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
            var gonder = files[i].name;
        }
        fileData.append('username', 'Faisal');
        $.ajax({
            url: '/Hakkimda/Foto/' + id,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            success: function (result) {
                alert(result);
                var yakala = '#f-' + id;               
                $('#mk').hide();
                $('#icrk').slideDown(1000);
                $(yakala).attr('src', '/Foto/'+gonder);
            },

            error: function (err) {
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported in the browser.");
    }
});
$(document).on('click', '.sndcv', function () {
    var id = $(this).attr('id');
    if (window.FormData !== undefined) {
        var fileUpload = $("#files1").get(0);
        var files = fileUpload.files;
        var fileData = new FormData();
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
            var yolla = files[i].name;
        }
        fileData.append('username', 'Faisal');
        $.ajax({
            url: '/Hakkimda/CvGnc/' + id,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            success: function (result) {                
                alert(result);                
                $('#mk').hide();
                $('#Cvgnc').slideUp(1000);
                $('#icrk').slideDown(1000);
                var yakala = '#c-' + id;
                $(yakala).text("/files/"+yolla);
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
$(document).on('click', '.cvv', function () {
    var id = $(this).attr('id');
    $('.sndcv').attr('id', id);
    $('#icrk').slideUp(1000);
    $("#Cvgnc").slideDown(1000);

});
$(document).ready(function () {
    $(document).on('click', '#vazgec1', function () {
        $('#mk').slideUp(1000);
        $('#Cvgnc').slideUp(1000);
        $('#icrk').slideDown(1000);
    });


});