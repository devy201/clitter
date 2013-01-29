/**
 * User: vlyamzin
 * Date: 1/23/13
 * Time: 4:29 PM
 */


var db = require('./models');


exports.loginPageShow = function(req, res){
    res.render('login', {title: "Log in to the system"});
};

exports.login = function(req, res){
    var inputName = req.body.login_name;
    var inputPass = req.body.login_pass;
    var Users = db.getUsers;
    var LoginToken = db.getLoginToken;


    inputName = inputName.replace(' ', '');
    Users.findOne({name: inputName}, function(err, data){
        /*login true*/
        if(data && data.authenticate(inputPass)){
            /* Login true*/
            //Save me
            var newToken = new LoginToken({email: data.email});
            newToken.save(function(){
                res.render('index', {title: 'Welcome '+inputName+'!', name: inputName, isLogin: true});
                res.cookie('logintoken', newToken.cookieValue, {
                    expires: new Date(Date.now()+2*604800000),
                    path: '/'
                })
            });

        }
        /*login false*/
        else {
            res.render('index', {title: 'Something go wrong', name: inputName, isLogin: false});
        }
    });




};