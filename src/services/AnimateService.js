export default ['$state', '$rootScope',function($state, $rootScope){
  var that= {
              animateRight: animateRight,
              animateLeft: animateLeft,
              animateMoonriseRight: animateMoonriseRight,
              animateMoonriseLeft: animateMoonriseLeft
            };

  function animateRight(element, distance) {
    $(element)
      .addClass('right')
      .removeClass('left')
      .stop()
      .animate( { left: '+='+distance }, 'slow', 'linear' );
  }

  function animateLeft(element, distance) {
    $(element)
      .addClass('left')
      .removeClass('right')
      .stop()
      .animate( { left: '-='+distance }, 'slow', 'linear' );
  }

  function animateMoonriseRight(element, distance) {
    var posFromTop = $(element).position().top;
    var posFromLeft = $(element).position().left;
    //debugger;
    if( posFromTop < 150 || posFromLeft > 500 ) {
      return;
    }
    $(element)
      .stop()
      .animate( 
        { 
          left: '+='+distance,
          top: '-='+distance
        }, 
        'slow', 
        'linear' 
      );
  }

  function animateMoonriseLeft(element, distance) {
    $(element)
      .stop()
      .animate( 
        { 
          left: '-='+distance,
          top: '-='+distance 
        }, 
        'slow', 
        'linear' 
      );
  }
 
  return that;

}];
