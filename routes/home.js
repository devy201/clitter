/**
 * Created with JetBrains WebStorm.
 * User: vlyamzin
 * Date: 2/11/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */

var db = require('./models');

exports.home = function(req, res){
    switch (req.params.format) {
        case 'html':
            res.render('home', {title: 'Home'});        
            break;
        case 'json':;
            getTasks('devy', function(data){
                res.send({'tasks': data});
            });
            break;
        default:
            res.render('home', {title: 'Home'});
            break;
    }
};

function Task(id, title, text, date, creator){

    this.id = id;
    this.title = title;
    this.text = text;
    this.date = date;
    this.creator = creator;
}

function getTasks(user, callback){
    var TasksStorage = db.getTasks;
    var tasksArray = [];

    TasksStorage.find({'creator': user}, function(err, data){
        if(data){
            for(var key in data){
                tasksArray.push(new Task(data[key]._id, data[key].title, data[key].note, data[key].date, data[key].creator));
            }
            callback(tasksArray);
        }
    });

}

exports.save = function(req, res){

    var TasksStorage = db.getTasks;

    switch (req.params.format){
        case 'json':
            if(req.body){
                var newTask = new TasksStorage({'title': req.body.title, 'note': req.body.text, 'date': req.body.date, 'creator': req.body.creator});
                newTask.save(function(err){
                    if(err){
                        throw err;
                    }
                    else{
                        console.log(newTask);
                        res.send({'answer': true});
                    }
                });
            }
            else{
                res.send({'answer': false, 'comment': 'data is empty'});
            }
            break;
        default:
            console.log('default');
            res.send('a');
    }

};
