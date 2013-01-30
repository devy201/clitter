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
    var inputPass = req.body.pass;
    var Users = db.getUsers;
    var LoginToken = db.getLoginToken;


    //find user by name
    if(req.body["name"]){
        var inputName = req.body.name;
        Users.findOne({name: inputName}, function(err, data){


            switch (req.params.format){
                case 'json':

                    /*login true*/
                    if(data && data.authenticate(inputPass)){
                        /* Login true*/
                        //Save me
                        var newToken = new LoginToken({email: data.email});
                        newToken.save(function(){
                            res.cookie('logintoken', newToken.cookieValue, {
                                expires: new Date(Date.now()+2*604800000),
                                path: '/'
                            });
                            res.send({'answer': true});
                        });
                    }
                    /*login false*/
                    else {
                        /*res.render('index', {title: 'Something go wrong', name: inputName, isLogin: false});*/
                        res.send({'answer': false});
                    }
                    break;
                default:
                    res.render('index', {title: 'Something go wrong'});
            }


        });
    }
    else {
        var inputEmail = req.body.email;
        Users.findOne({email: inputEmail}, function(err, data){

            switch (req.params.format){
                case 'json':

                    /*login true*/
                    if(data && data.authenticate(inputPass)){
                        /* Login true*/
                        //Save me
                        var newToken = new LoginToken({email: data.email});
                        newToken.save(function(){
                            /*res.render('index', {title: 'Welcome '+inputName+'!', name: inputName, isLogin: true});*/
                            res.cookie('logintoken', newToken.cookieValue, {
                                expires: new Date(Date.now()+2*604800000),
                                path: '/'
                            });
                            res.send({'answer': true});
                        });

                    }
                    /*login false*/
                    else {
                        /*res.render('index', {title: 'Something go wrong', name: inputName, isLogin: false});*/
                        res.send({'answer': false});
                    }
                    break;
                default:
                    res.render('index', {title: 'Something go wrong', name: inputName, isLogin: false});
            }


        });
    }







};