
/*
 * GET home page.
 */

function loginUser(name, pwd){

}

exports.index = function(req, res){
  res.render('index', { title: 'Hi dude!', message: 'Hello crab', isLogin: true, name:''});
};