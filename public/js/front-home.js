/**
 * Created with JetBrains WebStorm.
 * User: vlyamzin
 * Date: 2/25/13
 * Time: 5:25 PM
 * To change this template use File | Settings | File Templates.
 */

var taskArray = [];

function Task(title, text, date, creator, status, id){


    this.parseDate = function (){
        try{
            if(moment(date, 'MM/DD/YYYY').isValid()){
                return date;
            }
        }
        catch (error){
            date = moment().format('MM/DD/YYYY');
            return date;
        }
    };
    this.id = id;
    this.title = title;
    this.text = text;
    this.date = this.parseDate();
    this.creator = creator;
    this.status = status;
}

function isVisible(){
    $('.task').each(function(){
        if(!$(this).hasClass('visible')){
            $(this).find('.task-text').hide();
        }
    });
}

function showTaskNotes(task, button){
    task.slideToggle('fast');
    if(button.hasClass('open')){
        button.removeClass('open');
    }
    else{
        button.addClass('open');
    }
}

function addTaskToHTML(taskTitle, taskText, taskDate, location, prevDateMark, taskID){
    var dateMarkArray = location.find('.date-mark');
    var taskBox = location.find('.task-box');

    /* TEMPORARY BLOCK */
    //for task with today or tomorrow id
    if(location.attr('id') == 'ended'){
        taskBox.find('.task').addClass('deleted');
    }
    if(location.attr('id') !== 'someday'){
        taskBox.append('<div class="task" data-id="'+taskID+'"><div class="task-title"><h4>'+taskTitle+'</h4><div class="btn-cont">' +
            '<button class="ctrl-task"></button>' +
            '<button class="edit-task"></button>' +
            '<button class="end-task"></button></div>' +
            '<div class="clr"></div></div>' +
            '<div class="task-text">'+taskText+'</div></div>');
    }
    else{
        //append to someday block with existing dateMark
        if(dateMarkArray.length > 0){
            var consistBlock;
            dateMarkArray.each(function(){
                if($(this).text() == taskDate){
                    consistBlock = $(this);
                }
            });
            //add new task after previous with the same dateMark
            if(consistBlock != null){
                consistBlock.after('<div class="task" data-id="'+taskID+'"><div class="task-title"><h4>'+taskTitle+'</h4><div class="btn-cont">' +
                    '<button class="ctrl-task"></button>' +
                    '<button class="edit-task"></button>' +
                    '<button class="end-task"></button></div>' +
                    '<div class="clr"></div></div>' +
                    '<div class="task-text">'+taskText+'</div></div>');
            }
            //append to someday block with new dateMark
            else{
                if(prevDateMark){
                    var test = taskBox.find('.date-mark:contains('+prevDateMark+')');
                        test.before('<div class="date-mark">'+taskDate+'</div><div class="task" data-id="'+taskID+'"><div class="task-title"><h4>'+taskTitle+'</h4><div class="btn-cont">' +
                        '<button class="ctrl-task"></button>' +
                        '<button class="edit-task"></button>' +
                        '<button class="end-task"></button></div>' +
                        '<div class="clr"></div></div>' +
                        '<div class="task-text">'+taskText+'</div></div>');
                }
                else{
                    taskBox.append('<div class="date-mark">'+taskDate+'</div><div class="task" data-id="'+taskID+'"><div class="task-title"><h4>'+taskTitle+'</h4><div class="btn-cont">' +
                        '<button class="ctrl-task"></button>' +
                        '<button class="edit-task"></button>' +
                        '<button class="end-task"></button></div>' +
                        '<div class="clr"></div></div>' +
                        '<div class="task-text">'+taskText+'</div></div>');
                }
            }
        }
        //append to someday block with new dateMark if this block is empty
        else{
            taskBox.append('<div class="date-mark">'+taskDate+'</div><div class="task" data-id="'+taskID+'"><div class="task-title"><h4>'+taskTitle+'</h4><div class="btn-cont">' +
                '<button class="ctrl-task"></button>' +
                '<button class="edit-task"></button>' +
                '<button class="end-task"></button></div>' +
                '<div class="clr"></div></div>' +
                '<div class="task-text">'+taskText+'</div></div>');
        }
    }

    isVisible();
    $('.ctrl-task').off('click').on('click', function(){
        showTaskNotes($(this).parents().eq(2).find('.task-text'), $(this));
    });
    addPopover();
    /*END TEMPORARY*/
}

function setDeleteAnimation(taskID, status){

    var task = $('.task[data-id='+taskID+']');
    task.find('.task-text').slideUp('fast');

    if(status == 1){
        task.addClass('deleted').removeClass('visible').delay(300).slideUp('fast', function(){
            $('#ended .task-box').append(task);
            task.slideDown();
        });
        if(task.prev().hasClass('date-mark') && (task.next().hasClass('date-mark') || task.next().length === 0)){
            task.prev().remove();
        }
        task.find('.ctrl-task').removeClass('open');
    }
    else{
        // @TODO push query to the creator of the task. If closing was approved, remove task from DOM
        task.slideUp('fast', function(){
            this.remove();
        });
    }

}

function endTaskButtons(){
    return '<button id="end-yes" class="btn" onclick="endTask($(this), true)" style="margin-right: 28px;">Yes</button>'+
        '<button id="end-no" class="btn" onclick="endTask($(this))">No</button>';
}

function endTask($object, isEnded){
    if(isEnded){
        deleteTask($object.parents().eq(5));
    }
    $('.end-task').popover('hide');
}

function addPopover(){
    $('.end-task').each(function(){
        $(this).popover({
            title: "End task?",
            content: endTaskButtons(),
            html: true,
            trigger: 'click',
            placement: 'top'
        });
    });
}

function hideUnusedBlocks(){
    $('#today .task-box, #tomorrow .task-box, #someday .task-box, #ended .task-box').each(function(){
        if($(this).children('div').hasClass('task') ){
            $(this).parent().show();
        }
        else{
            $(this).parent().hide();
        }
    });
}

//tasks is the array of Taks objects
//we will receive it from server
function showUserTasks(tasks){
    var curDate = moment().format('MM/DD/YYYY');
    for(var task in tasks){
        var tID = tasks[task].id;
        var tTitle = tasks[task].title;
        var tText = tasks[task].text;
        var tDate = moment(tasks[task].date);
        var tStatus = tasks[task].status;
        var tCreator = tasks[task].creator;
        var flag = false;
        for (var id in taskArray){
            if (tID == taskArray[id].id){
                flag = true;
            }
        }
        //if task is already loaded to html - go next
        if(flag){
            continue;
        }
        //else add task to the array
        else{
            taskArray.push(new Task(tTitle, tText, tDate, tCreator, tStatus, tID));
            taskArray.sort(function(a, b){
                var textA = a.date;
                var textB = b.date;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        //add task to ended block
        if(tStatus === 1){
            addTaskToHTML(tTitle, tText, tDate._i, $('#ended'), null, tID);
            continue;
        }
        if(tDate.diff(curDate, 'days') === 0){
            //add task into today block
            addTaskToHTML(tTitle, tText, tDate, $('#today'), null, tID);
        }
        else if(tDate.diff(curDate, 'days') === 1){
            //add task into tomorrow block
            addTaskToHTML(tTitle, tText, tDate, $('#tomorrow'), null, tID);
        }
        else {
            //add task into someday block
            var appendBefore = tDate;
            var emptyAppend = false;
            for(var elem in taskArray){
                var elemDate = moment(taskArray[elem].date);
                //add task before the newest task in array
                if(elemDate.diff(appendBefore) > 0){
                    appendBefore = elemDate;
                    addTaskToHTML(tTitle, tText, tDate._i, $('#someday'), appendBefore._i, tID);
                    emptyAppend = false;
                    break;
                }
                //if not add new task to the end of array
                else{
                    emptyAppend = true;
                }
            }
            if(taskArray.length === 0 || emptyAppend){
                addTaskToHTML(tTitle, tText, tDate._i, $('#someday'), null, tID);
                emptyAppend = false;
            }
        }

    }
}

function loadTasks(){
    $.ajax({
        type: 'GET',
        url: '/'+getNameFromURL()+'/home.json',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(getNameFromURL()),
        success: function(data){
            //console.log(data);
            showUserTasks(data.tasks);
        },
        error: function(err){
            console.log(err);
        }
    });
}

/**
 * No params
 * @return String data of user name
 */
function getNameFromURL(){
    var currentURL = document.createElement('a');
    var segment;
    currentURL.href = document.URL;
    segment = currentURL.pathname.replace(/^\//,'').split('/');
    return segment[0];
}

/**
 * @param task Task Task, that should be updated
 * @return Undefined Nothing return
 * */
function updateTask(task){
    $.ajax({
        type: 'PUT',
        url: '/'+getNameFromURL()+'/home.json',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(task),
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

/**
 * @param task Task Task, that should be deleted
 * @return Undefined Nothing to return
 * */
function deleteTask(task){
    var taskID = task.data('id');
    if(task.hasClass('deleted')){
        for(var curTask in taskArray){
            if(taskArray[curTask].id === taskID){
                taskArray[curTask].status = 2;
                sendAjax(taskArray[curTask]);
            }
        }
    }
    else{
        for(var curTask in taskArray){
            if(taskArray[curTask].id === taskID){
                taskArray[curTask].status = 1;
                sendAjax(taskArray[curTask]);
            }
        }
    }

    function sendAjax(task){
        $.ajax({
            type: 'DELETE',
            url: '/'+getNameFromURL()+'/home.json',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(task),
            success: function(data){
                switch (data.answer) {
                    case 1:
                        setDeleteAnimation(taskID, data.answer);
                        break;
                    case 2:
                        setDeleteAnimation(taskID, data.answer);
                        break;
                    default:
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}

$(function(){

    isVisible();
    addPopover();
    hideUnusedBlocks();
    loadTasks();


    $('.ctrl-task').on('click', function(){
        showTaskNotes($(this).parents().eq(2).find('.task-text'), $(this));
    });


    $('#add-task')
        .on('click', function(){
            var taskTitle = $('.new-task-title').val();
            var taskText = $('.new-task-area').html();
            var taskDate = $('.new-task-btns .datepicker').val();
            var taskStatus = 0;     //default status code for open tasks
            if(taskTitle == ""){
                $('.new-task-title').attr('placeholder', 'Please, add title!');
                return false;
            }
            else{
                var newTask = new Task(taskTitle, taskText, taskDate, getNameFromURL(), taskStatus);
                $.ajax({
                    type: 'POST',
                    url: '/devy/home.json',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(newTask),
                    success: function(data){
                        newTask.id = data.id;
                        showUserTasks([newTask]);
                        $('.new-task-title, .datepicker').val('');
                        $('.new-task-area').text('');
                    },
                    error: function(err){
                        console.log(err);
                    }
                });

            }
        });

    $('.home').bind('DOMSubtreeModified', function(){
        hideUnusedBlocks();
    });

    $('.datepicker').datepicker({
        startDate: new Date()
    });

    $('#editor').wysiwyg();

    $('.dropdown-menu input').click(function() {return false;})
        .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});


});