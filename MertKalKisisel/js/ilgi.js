
$(document).on('click', '.Sil', function () {
    var id = $(this).attr('id');
    var oy = '#ol-' + id;
    
    $.ajax({
        url: '/ilgialani/Sil/' + id,
        type: 'Post',
        dataType: 'json',
        success: function (dgr) {     
           
            alert(dgr);
            $(oy).hide();
           
                  
            
        }



    });
});
$(document).on('click', '.Guncelle', function () {
    var id = $(this).attr('id');  

    $.ajax({
        url: '/ilgialani/GuncJson',
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
                    '<input id="ID" value=' + veri.Result.ilgiAlaniID + ' class="swal2-input" readonly="readonly" >' +
                    '<label>İlgi Alanı</label>' +
                    '<textarea id="frm" class="swal2-input"' + 'value="' + veri.Result.ilgiAlanlarim + '">' + veri.Result.ilgiAlanlarim + '</textarea>',

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ID').value,
                        document.getElementById('frm').value,

                    ]
                }

            });
            $.ajax({
                url: '/ilgialani/GuncJ',
                type: 'post',
                dataType: 'json',
                data: { 'ID': id, 'frm': formValues[1]},
                success: function (dgr) {
                    if (dgr == '1') {                        
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
            });

        }
    });




});
$(document).ready(function () { 
$(document).on('click', '#yeni', async function () {
    const { value: formValues } = await Swal.fire({
        title: 'Yeni Ekle',
        showCancelButton: true,
        cancelButtonColor: '#d43f3a',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Ekle',
        confirmButtonColor:'#337ab7',
        html:
            '<input required="required" id="ilgi" placeholder="İlgi Alanınız" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('ilgi').value,                
            ]
        }
    })
    $.ajax({
        url: '/ilgialani/EkleJson',
        type: 'post',
        dataType: 'json',
        data: { 'ilgi': formValues[0] },
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
                var buton = '<button id=' + dgr + ' class="btn btn-danger Sil ">Sil</button>';
            var buton2 = '<button id=' + dgr + ' class="btn btn-success Guncelle ">Güncelle</button>';
            var agr = '<tr id="ol-' + dgr + '"><td>' + dgr + '</td><td>' + formValues[0] + '</td><td>' + buton + '</td><td>' + buton2 + '</td></tr>';
                $('#example1').prepend(agr);

            
        }


    })
   


});
})
