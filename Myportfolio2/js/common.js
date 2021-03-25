
$(document).ready(function() {
  $('#pagepiling').pagepiling({
    menu: '#menu',
    anchors: ['page1', 'page2', 'page3','page4'],
    navigation: {
      'position': 'right',
      'tooltips': ['section1', 'section2', 'section3', 'section4']
    },
    scrollingSpeed: 1000,
    sectionSelector: '.contents'
  });
});


jQuery(function($){
  
  var photo_list$ = $('#photo_list');
  var li$ = $('#photo_list li');
  var li_count = li$.length;
  var li_width = li$.width() + parseInt(li$.css('margin-left'), 10) + parseInt(li$.css('margin-right'), 10);
  var ul_padding = parseInt(photo_list$.css('padding-left') , 10) + parseInt(photo_list$.css('padding-right') , 10);
  var slider_inner$ = $('#slider_inner');
  slider_inner$.css('width', (li_width * li_count + ul_padding) + 'px');
  $('#photo_list li:last').prependTo(photo_list$);
  slider_inner$.css('margin-left', '-' + li_width + 'px');  
  
  $('#slider_prev').click(function(){
    slider_inner$.stop().animate({
      marginLeft: parseInt(slider_inner$.css('margin-left'), 10) + li_width + 'px'
    }, 800,
    function(){
      slider_inner$.css('margin-left', '-' + li_width + 'px');
      $('#photo_list li:last').prependTo(photo_list$);
    });
  });
  
  $('#slider_next').click(function(){
    slider_inner$.stop().animate({
      marginLeft: parseInt(slider_inner$.css('margin-left'), 10) - li_width + 'px'
    }, 800,
    function(){
      slider_inner$.css('margin-left', '-' + li_width + 'px');
      $('#photo_list li:first').appendTo(photo_list$);
    });
  });
  
  var timer;
  var is_stopped = false;
  var next_prev$ = $('#slider_next, #slider_prev');
  function start_carousel() {
    timer = setInterval(function(){
      $('#slider_next').click();
    },2500);
    $('#stop').text('Stop');
    is_stopped = false;
  }
  
  function stop_carousel() {
    clearInterval(timer);
    $('#stop').text('Start');
    is_stopped = true;
  }
  
  $('#slider_wrap').hover(function() {
    clearInterval(timer);
    next_prev$.show();
  },function() {
    if(!is_stopped) {
      start_carousel();
      next_prev$.hide();  
    }      
  });
  
  $('#stop').click(function(){
    if(is_stopped) {
      start_carousel();
      next_prev$.hide();
    }else{
      stop_carousel();
      next_prev$.show();
    }    
  });
  next_prev$.hide();
  start_carousel();
  
  //念のため（不要？）
  $(window).unload(function(){
    window.clearInterval(timer);
  });
});
