/**
 * User: vlyamzin
 * Date: 1/24/13
 * Time: 12:13 PM
 */

$(function(){

    /*
    *   set main content on the center of the page
    * */
    function setMainContPosition(){
        var $mainCont = $('.main-container');
        var documentCenterY = $(window).height()/2;
        $mainCont.css({'top': documentCenterY-200});
    }


    /*
    * change main content position after resizing window
    * */
    $(window).on('resize', function(){
        setMainContPosition();
    });

    setMainContPosition();

  });