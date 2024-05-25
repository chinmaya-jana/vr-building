AFRAME.registerComponent('play-pause', {
      init: function() {
        var abc = this.el.getAttribute('class');
        var myVideo = document.querySelector('#sun');
        var videoControls = document.querySelector('#videoControls');
        videoControls.addEventListener('click', function() {
          if(abc === 'vplay') {
            if(myVideo.paused) {
                myVideo.play();
            }
            else {
                myVideo.pause();
            }
          }
        });
      }
});