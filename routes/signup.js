/**
 * User: vlyamzin
 * Date: 1/21/13
 * Time: 3:30 PM
 */
var db = require('./models');
/*
* Get login page
* */

exports.signup = function(req, res){
    res.render('signup', {title: 'Sign Up'});
};

exports.saveUser = function(req, res){
    var inpName = req.body.login;
    var inpPass = req.body.pass;
    var inpEmail = req.body.email;
    var Users = db.getUsers;
    var addNewUser = new Users({name:inpName, email: inpEmail, password: inpPass});

    addNewUser.save(function(err, test){
        if(err){
            console.log(err);
        }
        else {
            //@TODO should redirect to the user main page
            res.redirect("index", {title: "Welcome! "+inpName});
        }
    });


};