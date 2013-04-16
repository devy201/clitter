/**
 * User: vlyamzin
 * Date: 1/29/13
 * Time: 5:40 PM
 */
function getInputData(){
    var loginName = $('input[name="login_name"]').val();
    var loginPass = $('input[name="login_pass"]').val();
    var emailRegExp = /[a-z0-9!$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;

    /*check if user input email or name*/
    if(emailRegExp.test(loginName)){
        return {
            "email": loginName,
            "pass": loginPass
        }
    }
    else return{
        "name": loginName,
        "pass": loginPass
    }
}

function checkRequiredInputs(){
    var isEmpty;
    $('#login-form input').each(function(i){
        if($(this).val() === ''){
            $('#login-form p.red').text('Input shouldn\'t be empty').show();
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
$(function(){

    $('#sign-in').on('click', function(){

        if(!checkRequiredInputs()){
            $.ajax({
                type: 'POST',
                url: '/login.json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(getInputData()),
                success: function(data){
                    console.log(data);
                    if(data.answer === false){
                        $('#login-form p.red').text('You have input wrong data').show();
                    }
                    if(data.answer === true){
                        window.location.href = "/"+data.user+"/home";
                    }
                }

            })
        }




    })
});