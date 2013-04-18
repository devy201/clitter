/**
 * Created with JetBrains WebStorm.
 * User: vlyamzin
 * Date: 4/17/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

exports.logout = function(req, res){
    res.render('logout', {title: "Good bye"});
    res.clearCookie('logintoken');
}