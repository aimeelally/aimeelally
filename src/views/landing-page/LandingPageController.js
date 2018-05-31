"use strict";

angular.module("landingPage", [])
  .component("landingPage", {
    template: require("./landing-page.html"), 
    controller: [ '$scope',
      function LandingPageController($scope) {
        
        $(document).ready(function(){

        $('body').keydown(function(e) {
          
          // if(e.keyCode == 38) { // up key
          //     $('.box')
          //         .addClass('up')
          //         .removeClass('left right down')
          //         .stop()
          //         .animate({
          //             top: '-=400'
          //         });
          //   }
          if(e.keyCode == 37) { // left key
            $('.susie')
                .addClass('left')
                .removeClass('right down up')
                .stop()
                .animate({
                   left: '-=100'
               });
          }
          else if(e.keyCode == 39) { // right key
            $('.susie')
                .addClass('right')
                .removeClass('left down up')
                .stop()
                .animate({
                   left: '+=100'
                });
          }
          // else if(e.keyCode == 40) { // down key
          //   $('.box')
          //     .addClass('down')
          //     .removeClass('left right up')
          //     .stop()
          //     .animate({
          //        top: '+=400'
          //      });
          // }
        }).keyup(function(e){ 
          // On keyup all direction classes are moved
          $('.susie').removeClass('right down up left');
        });
      });



      }
        
    ]
  });
  
  //