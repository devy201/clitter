/**
 * Created with JetBrains WebStorm.
 * User: vlyamzin
 * Date: 2/11/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
exports.home = function(req, res){
    res.render('home', {title: 'Home'});
};