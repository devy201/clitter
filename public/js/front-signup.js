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

function checkRequiredInputs(){
    var isEmpty;
    var emailRegExp = /[a-z0-9!$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|ru|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/

    if(!emailRegExp.test($('#email').val())){
        isEmpty = true;
        $('#signup-form p.red').text('Email address is not correct').show();
    }
    $('#signup-form .required-box input').each(function(i){
        if($(this).val() === ''){
            $('#signup-form p.red').text('Input shouldn\'t be empty').show();
            $(this).focus();
            isEmpty = true;
            return false;
        }
        else{
            isEmpty = false;
        }
    });
    return isEmpty;
}

function getInputData(){
    var loginName = $('#login-name').val();
    var loginPass = $('#pass').val();
    var loginEmail = $('#email').val();

    return {
        "name": loginName,
        "pass": loginPass,
        "email": loginEmail
    }
}

$(function(){


    $('#signup-form input').each(function(){
        $(this).on('focus', function(){
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

    $('#sign-up').on('click', function(){

        if(!checkRequiredInputs()){

            $.ajax({
                type: 'POST',
                url: '/signup.json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(getInputData()),
                success: function(data){

                    if(data.answer === false){
                        $('#signup-form p.red').text('Login name or email are in use already').show();
                    }
                    if(data.answer === true){
                        window.location.href = "/users"
                    }
                }

            })
        }

    })
});