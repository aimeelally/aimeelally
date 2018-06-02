"use strict";

angular.module("interactiveCv", [])
  .component("interactiveCv", {
    template: require("./interactive-cv.html"), 
    controller: [ '$scope', 'ContactService',
      function InteractiveCvController($scope, ContactService) {

        const FARTHEST_POINT_LEFT = 200;
        const FARTHEST_POINT_RIGHT = -8000;

        var movLeft = 0;
        var movRight = 0;
        var speedVSlow = 5,
            speedSlow = 200,
            speedMed = 300,
            speedFast = 800,
            speedVFast = 1000;

        $scope.contactForm = {};

        var keysdown = {},
            scrollTracker = {};

        $scope.submitContactForm = function() {
          var contactForm = JSON.stringify($scope.contactForm);
          return ContactService.sendMessage(contactForm);
        }; 

        init();

        function init() {
          $('.susie').addClass('animate-in');

          setTimeout(function() {
            $('.susie').removeClass('animate-in');
            $('.susie').addClass('show-animation');
            $('.susie-shadow').addClass('show-animation');
          },1000);
        }

        function animateRight(element, distance) {
          $(element)
            .addClass('right')
            .removeClass('left down')
            .stop()
            .animate({
              left: '+='+distance
            });
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
          
          var blockerPosition = $("#stop-scroll").offset().left;
          var blockerPositionAfterMove = blockerPosition - speedMed;
          
          if(direction === 'left' && blockerPositionAfterMove <= FARTHEST_POINT_LEFT) {
            return true;
          }
          else if(direction === 'right' && blockerPositionAfterMove >= FARTHEST_POINT_RIGHT) {
            return true;
          }

          return;

        }

        function stoppedScrolling() {
          $('.susie').removeClass('right left');
          $('.susie-shadow').addClass('show-animation');
        }
        
        $(document).ready(function(){

          $(window).on('swipeleft', function() {
            //console.log('swiped left');
          });

          var scrollPosition = 0;
          $(window).scroll(function() {
            //dont do the scroll animation if also pressing keys
            if (keysdown.keydown) return;

            scrollTracker.isScrolling = true;
            
            var currentScrolledPosition = $(document).scrollLeft();
              if (scrollPosition > currentScrolledPosition) {
                //console.log('scroll right');
                scrollPosition = currentScrolledPosition;

                $('.susie-shadow').removeClass('show-animation');
                $('.susie').removeClass('face-right');
                $('.susie').addClass('face-left');
                animateLeft('.susie', 0);
                setTimeout(function() {
                  stoppedScrolling();
                  scrollTracker.isScrolling = false;
                },500);
              }
              else if (scrollPosition < currentScrolledPosition) {
                //console.log('scroll left');
                scrollPosition = currentScrolledPosition;

                $('.susie-shadow').removeClass('show-animation');
                $('.susie').removeClass('face-left');
                $('.susie').addClass('face-right');
                animateRight('.susie', 0);
                setTimeout(function() {
                  stoppedScrolling();
                  scrollTracker.isScrolling = false;
                },500);
              }
              
          });
            
            $('body').keydown(function(e) {
              
              //dont do the scroll animation if also pressing keys
              if (scrollTracker.isScrolling) return;
              
              // Remember it's down
              keysdown.keydown = true;

              var ek = e.keyCode;
              if (ek==39) movRight=1;
              if (ek==38) movRight=1;
              if (ek==37) movLeft=1;
              if (ek==40) movLeft=1;
              
              setInterval(movTick(), 1000); // Setup interval. Delay controlls tickrate.

            });

            // Keyup listener
            $("body").keyup(function(e) {

              // Remember it's down
              keysdown.keydown = false;

              var ek = e.keyCode;
              if (ek==39) movRight=0;
              if (ek==38) movRight=0;
              if (ek==37) movLeft=0;
              if (ek==40) movLeft=0;

              $('.susie').removeClass('right left');
              $('.susie-shadow').addClass('show-animation');

            });

            // Move one pixel for each direction and check if move is valid.
            function movTick() {

              var moved = 0;
              if (movRight) { 

                if(!isValidMove('right')) {
                  return;
                }

                $('.susie-shadow').removeClass('show-animation');

                $('.susie').removeClass('face-left');
                $('.susie').addClass('face-right');
                
                animateRight('.susie', 0);
                
                animateLeft('.med-moving-items', speedMed);
                animateLeft('.slow-moving-items', speedSlow);
                animateLeft('.v-slow-moving-items', speedVSlow);
                
                moved = 1;
              }

              if (movLeft) { 
                if(!isValidMove('left')) {
                  return;
                }

                $('.susie-shadow').removeClass('show-animation');

                $('.susie').removeClass('face-right');
                $('.susie').addClass('face-left');
                animateLeft('.susie', 0);

                animateRight('.med-moving-items', speedMed);
                animateRight('.slow-moving-items', speedSlow);
                animateRight('.v-slow-moving-items', speedVSlow);

                moved = 1;
              }
              

              if (!moved) return false;
                
            }


          });



      }
        
    ]
  });
  