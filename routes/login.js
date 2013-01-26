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


    inputName = inputName.replace(' ', '');
    Users.findOne({name: inputName}, function(err, data){
        /*login true*/
        if(data.length != 0){
            /*
            * pass true
            * */
            if(data.authenticate(inputPass)){
                res.render('index', {title: 'Welcome '+inputName+'!', name: inputName, isLogin: true});
            }
            /*
            * pass false
            * */
            else{
                res.render('index', {title: 'Something go wrong', name: inputName, isLogin: false});
            }
        }
        /*login false*/
        else {
            res.render('index', {title: 'Something go wrong', name: inputName, isLogin: false});
        }
    });




};