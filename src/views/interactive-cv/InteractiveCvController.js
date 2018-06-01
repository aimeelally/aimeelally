"use strict";

angular.module("interactiveCv", [])
  .component("interactiveCv", {
    template: require("./interactive-cv.html"), 
    controller: [ '$scope',
      function InteractiveCvController($scope) {
        
        $(document).ready(function(){
            
            /*var windowHeight = $(window).height();
            $('.setPageHeight')
                .css('height', windowHeight);*/

            var keysdown = {};
            var hasMadeFirstMove = false;
            var speedVSlow = 5,
                speedSlow = 200,
                speedMed = 300,
                speedFast = 800,
                speedVFast = 1000;


            /*// Bind the swipeHandler callback function to the swipe event on div.box
            $( "div#interactive-cv" ).on( "swipe", swipeHandler );
           
            // Callback function references the event target and adds the 'swipe' class to it
            function swipeHandler( event ){
              $( event.target ).addClass( "swipe" );
            }

            $('body').scroll(function() {
              debugger;
                didScroll = true;
            });*/

            




            //press button
            //check if a move is valid before anything else
            //if valid continue


            function animateRight(element, distance) {
              $(element)
                .addClass('right')
                .removeClass('left down')
                .stop()
                .animate({
                  left: '+='+distance
                });
              // setTimeout(function(){
              //   animateRight(element,distance);
              // },500);
            }

            function animateLeft(element, distance) {
              $(element)
                .addClass('left')
                .removeClass('right down up')
                .stop()
                .animate({
                   left: '-='+distance
               });
            }

            function isValidMove(direction) {

              const FARTHEST_POINT_LEFT = 200;
              const FARTHEST_POINT_RIGHT = 1000;
              
              var blockerPosition = $("#stop-scroll").offset().left;
              var blockerPositionAfterMove = blockerPosition - speedMed;

              
              if(direction === 'left' && blockerPositionAfterMove <= 200) {
                return true;
              }
              else if(direction === 'right' && blockerPositionAfterMove >= -8000) {
                return true;
              }

              return;

            }

            /*var lastScrollTop = 0;
            $('div#interactive-cv').scroll(function(){
              debugger;
               var st = $(this).scrollTop();
               if (st > lastScrollTop){
                   // downscroll code
                   $('.susie').removeClass('face-left');
                    $('.susie').addClass('face-right');
                    animateRight('.susie', 0);
                    
                    animateLeft('.med-moving-items', speedMed);
                    animateLeft('.slow-moving-items', speedSlow);
                    animateLeft('.v-slow-moving-items', speedVSlow);
               } else {
                  // upscroll code
                  $('.susie').removeClass('face-right');
                  $('.susie').addClass('face-left');
                  animateLeft('.susie', 0);

                  animateRight('.med-moving-items', speedMed);
                  animateRight('.slow-moving-items', speedSlow);
                  animateRight('.v-slow-moving-items', speedVSlow);
               }
               lastScrollTop = st;
            });*/

            $('body').keydown(function(e) {

              //console.log($('.ground-container').offset().left);
              if (keysdown[e.keyCode]) {
                // Ignore it
                return;
              }
              
              // Remember it's down
              keysdown[e.keyCode] = true;
              
              if(e.keyCode == 38 || e.keyCode == 39) { // up or right key
                
                if(!isValidMove('right')) {
                  return;
                }

                $('.susie').removeClass('face-left');
                $('.susie').addClass('face-right');
                animateRight('.susie', 0);
                
                animateLeft('.med-moving-items', speedMed);
                animateLeft('.slow-moving-items', speedSlow);
                animateLeft('.v-slow-moving-items', speedVSlow);

              }
              else if(e.keyCode == 37 || e.keyCode == 40) { // left or down key
                if(!isValidMove('left')) {
                  return;
                }

                $('.susie').removeClass('face-right');
                $('.susie').addClass('face-left');
                animateLeft('.susie', 0);

                animateRight('.med-moving-items', speedMed);
                animateRight('.slow-moving-items', speedSlow);
                animateRight('.v-slow-moving-items', speedVSlow);
              }

            }).keyup(function(e){ 
              // On keyup all direction classes are moved
              delete keysdown[e.keyCode];
              setTimeout(function() {
                $('.susie').removeClass('right left');
              }, 500);
              
            });
          });



      }
        
    ]
  });
  
  //