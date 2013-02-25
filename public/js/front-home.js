/**
 * Created with JetBrains WebStorm.
 * User: vlyamzin
 * Date: 2/25/13
 * Time: 5:25 PM
 * To change this template use File | Settings | File Templates.
 */


$(function(){

    $('.task-title')
        .on('mouseenter', function(){
            $(this).children('.btn-cont').fadeIn('fast');
        })
        .on('mouseleave', function(){
            $(this).children('.btn-cont').fadeOut('fast');
        })

});