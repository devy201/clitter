/**
 * Created with JetBrains WebStorm.
 * User: devy
 * Date: 1/20/13
 * Time: 4:09 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var Users, LoginToken;
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectId;

/*
* connect to the database
* */
var model = mongoose.connect('mongodb://devy:DvY02061989@linus.mongohq.com:10013/devy_devy201', function(err){
    if(err) throw  err;
    else{
        console.log('connected');
    }
});

/*
 * Model: Users
 * */
Users = new Schema({
    name: {
        type: String,
        index: {unique: true}
    },
    email: {
        type: String,
        index: {unique: true}
    },
    pass: String,
    salt: String
});

Users.virtual('id').get(function(){
    return this._id.toHexString();
});

Users.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.pass = this.encryptPass(password);
    })
    .get(function(){
        return this._password;
    });

Users.method('authenticate', function(plainText){
    return this.encryptPass(plainText) === this.pass;

});

Users.method('encryptPass', function(password){
    console.log(crypto.createHmac('sha1', this.salt).update(password).digest('hex'));
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

Users.method('makeSalt', function(){
    return Math.round((new Date().valueOf() * Math.random())) + '';
});


/*
* Model: LoginToken
* */
LoginToken = new Schema({
    email: {type: String, index: true},
    series: {type: String, index: true},
    token: {type: String, index: true}
});

LoginToken.virtual('id').get(function(){
    return this._id.toHexString();
});

LoginToken.virtual('cookieValue').get(function(){
    return JSON.stringify({email: this.email, token: this.token, series: this.series})
});

LoginToken.method('randomToken', function(){
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

LoginToken.pre('save', function(next){
    this.token = this.randomToken();

    if(this.isNew){
        this.series = this.randomToken();
    }
    next();
});

exports.getUsers = model.model('Users', Users);
exports.getLoginToken = model.model('LoginToken', LoginToken);
