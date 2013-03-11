/**
 * Created with JetBrains WebStorm.
 * User: vlyamzin
 * Date: 2/25/13
 * Time: 5:25 PM
 * To change this template use File | Settings | File Templates.
 */

function isVisible(){
    $('.task').each(function(i){
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

function addTask(){
    var taskTitle = $('.new-task-title').val();
    var taskText = $('.new-task-area').val();

    /* TEMPORARY BLOCK */
    var taskBlock = $('.task-box #today');

    taskBlock.append('<div class="task"><div class="task-title"><h4>'+taskTitle+'</h4><div class="btn-cont">' +
        '<button class="ctrl-task"></button>' +
        '<button class="edit-task"></button>' +
        '<button class="end-task"></button></div></div>' +
        '<div class="task-text">'+taskText+'</div></div>');

    showButtons();
    isVisible();
    $('.ctrl-task').off('click').on('click', function(){
        showTaskNotes($(this).parents().eq(2).find('.task-text'), $(this));
    });
    /*END TEMPORARY*/
}

function deleteTask(task){
    task.find('.task-text').slideUp('fast');
    task.addClass('deleted').removeClass('visible').delay(300).slideUp('fast', function(){
        $('#ended').append(task);
        task.slideDown()
    });
    task.find('.ctrl-task').removeClass('open');


}

function showButtons(){
    $('.task-title')
        .on('mouseenter', function(){
            $(this).children('.btn-cont').fadeIn('fast');
        })
        .on('mouseleave', function(){
            $(this).children('.btn-cont').fadeOut('fast');
        });
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


$(function(){

    isVisible();
    showButtons();
    $('.end-task').each(function(){
        $(this).popover({
            title: "End task?",
            content: endTaskButtons(),
            html: true,
            trigger: 'click',
            placement: 'top'
        })
    });

    $('.ctrl-task').on('click', function(){
        showTaskNotes($(this).parents().eq(2).find('.task-text'), $(this));
    });


    $('#add-task').on('click', function(){
        addTask();
    })

});