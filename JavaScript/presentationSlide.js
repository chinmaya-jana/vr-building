AFRAME.registerComponent('slide-show', {
    init: function() {
      // Slides
      var p_slide = document.querySelectorAll('.clickable');
        
      // Screen / Display
      var screen = document.querySelector('#screen');
        
      // index For iteration
      let index = 0;
      
      // Next-Button
      var next = document.querySelector('#next');
      var abc = next.getAttribute('class');
      
      // When click next-Button
      next.addEventListener('click', function () {
        if(abc === 'goNext') {
           if(index < p_slide.length - 1) {
              index++;
           }
           screen.setAttribute('src', p_slide[index].getAttribute('src'));
        }
      });
        
      // Previous-Button 
      var previous = document.querySelector('#previous');
      var cba = previous.getAttribute('class');
        
      // When click previous-button
      previous.addEventListener('click', function () {
        if(cba === 'goPrevious') {
           if(index > 0) {
              index--;
           }
           screen.setAttribute('src', p_slide[index].getAttribute('src'));
        }
      });
    }
  });