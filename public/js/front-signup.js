/**
 * User: vlyamzin
 * Date: 1/29/13
 * Time: 12:25 PM
 */
function showLablels(input){
    $('#'+input.attr('id')+'-label').fadeIn('fast').css({'display': 'inline-block'});
}

function inputPhoto(){

}

$(function(){


    $('#signup-form input').each(function(){
        $(this).on('focus', function(){
            console.log($(this).attr('id'));
            showLablels($(this));
        });
    });

    $('.input-append > *').on('click', function(){
        var $fileUpload = $('#file-upload');

        $fileUpload
            .click()
            .change(function(){
                $('.input-append input').val($(this).val());
            });

    })
});