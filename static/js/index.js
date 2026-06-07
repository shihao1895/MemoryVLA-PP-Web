window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/animation";
var NUM_INTERP_FRAMES = 50;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 1; i <= NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/heatmap_' + String(i) + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
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
			slidesToShow: 1,
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
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(1);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // ======= Video Toggle =======
    function playPanelVideos(panel) {
      var videos = panel.getElementsByTagName("video");
      for (let i = 0; i < videos.length; i++) {
        videos[i].muted = true;
        videos[i].play().catch(function() {});
      }
    }

    function pausePanelVideos(panel) {
      var videos = panel.getElementsByTagName("video");
      for (let i = 0; i < videos.length; i++) {
        videos[i].pause();
        videos[i].currentTime = 0;
      }
    }

    var videoToggles = document.getElementsByClassName("video-toggle");
    for (let i = 0; i < videoToggles.length; i++) {
      if (videoToggles[i].dataset.bound === "true") {
        continue;
      }

      videoToggles[i].dataset.bound = "true";
      videoToggles[i].addEventListener("click", function() {
        var isOpen = this.classList.toggle("is-active");
        this.setAttribute("aria-expanded", isOpen ? "true" : "false");

        var content = this.parentElement.nextElementSibling;
        if (content && content.classList.contains("video-panel")) {
          content.classList.toggle("is-open", isOpen);
          if (isOpen) {
            playPanelVideos(content);
          } else {
            pausePanelVideos(content);
          }
        }
      });
    }

})
