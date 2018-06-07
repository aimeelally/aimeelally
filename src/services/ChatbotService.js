export default ['$state', '$rootScope',function($state, $rootScope){
  var that= {
              yesShesLooking: yesShesLooking,
              noShesNotLooking: noShesNotLooking 
            };

  function yesShesLooking() {
    console.log('great');
  }

  function noShesNotLooking() {
    console.log('what would you know');
  }

 
  return that;

}];
