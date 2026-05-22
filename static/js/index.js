window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/images/culling";
var NUM_INTERP_FRAMES = 31;

var interp_images_mesongs = [];
var interp_images_ours = [];
var interp_images_lightgs = [];
function preloadInterpolationImages(work, target_array) {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + work + '/' + String(NUM_INTERP_FRAMES-i) + '.png'; // .padStart(6, '0')
    target_array[i] = new Image();
    target_array[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image_mesongs = interp_images_mesongs[i];
  image_mesongs.ondragstart = function() { return false; };
  image_mesongs.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-mesongs').empty().append(image_mesongs);


  var image_ours = interp_images_ours[i];
  image_ours.ondragstart = function() { return false; };
  image_ours.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-ours').empty().append(image_ours);

  var image_lightgs = interp_images_lightgs[i];
  image_lightgs.ondragstart = function() { return false; };
  image_lightgs.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-lightgs').empty().append(image_lightgs);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages('mesongs', interp_images_mesongs);
    preloadInterpolationImages('potr', interp_images_ours);
    preloadInterpolationImages('lightgs', interp_images_lightgs);

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
