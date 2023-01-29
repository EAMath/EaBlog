
$(function(){
  $("#switch-view").click(function(){
    $(this).find("button").toggleClass("active");
    $(".article-wrapper").toggleClass("bloc col-xs-12 col-xs-12 col-sm-6 col-md-4 col-lg-4");
  });
});


$(function(){
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  // alert("mobile device");
  var elements = document.getElementsByClassName('ChangeButton');
  for(var i= 0; i<elements.length; i++){
    elements[i].style.display='none';
    }
}else{
  // false for not mobile device
  // alert("not mobile device");
}
});


$(function(){

    var x = document.getElementsByClassName("randomimg");

    var str = "https://picsum.photos/150/150?random=";
    var i;
    for(i=0; i<x.length; i++){
      str = "https://picsum.photos/150/150?random=" + i;
      x[i].src = str;
    }

});




// Preloader
$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});


(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  });

/*--/ Navbar Menu Reduce /--*/
$(window).trigger('scroll');
$(window).on('scroll', function () {
  var pixels = 30;
  var top = 1200;
  if ($(window).scrollTop() > pixels) {
    $('.navbar-expand-md').addClass('navbar-reduce');
    $('.navbar-expand-md').removeClass('navbar-trans');
  } else {
    $('.navbar-expand-md').addClass('navbar-trans');
    $('.navbar-expand-md').removeClass('navbar-reduce');
  }
  if ($(window).scrollTop() > top) {
    $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
  } else {
    $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
  }
});

})(jQuery);
