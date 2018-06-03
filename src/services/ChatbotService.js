export default ['$state', '$rootScope',function($state, $rootScope){
  var that= {
              yes: yes,
              no: no 
            };

  function yes() {
    console.log('great');
  }

  function no() {
    console.log('what would you know');
  }

 
  return that;

}];
