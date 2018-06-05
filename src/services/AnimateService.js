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

  function animateMoonriseRight(element, distanceRight, distanceUp) {
    var posFromTop = $(element).position().top / $(window).height()  * 100;//$(element).position().top;
    var posFromLeft = $(element).position().left / $(window).width()  * 100;//$(element).position().left;
    //debugger;
    if( posFromTop < 10 || posFromLeft > 70 ) {
      return;
    }
    $(element)
      .stop()
      .animate( 
        { 
          left: '+='+distanceRight,
          top: '-='+distanceUp
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
