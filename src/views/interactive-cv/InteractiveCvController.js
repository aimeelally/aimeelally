"use strict";

angular.module("interactiveCv", [])
  .component("interactiveCv", {
    template: require("./interactive-cv.html"), 
    controller: [ '$scope', 'ContactService', 'ChatbotService', 'AnimateService',
      function InteractiveCvController($scope, ContactService, ChatbotService, AnimateService) {

        const FARTHEST_POINT_LEFT = 200;
        const FARTHEST_POINT_RIGHT = -8000;

        var timeOfDay = '';
        var movLeft = 0;
        var movRight = 0;
        var speedVSlow = 0,
            speedSlow = 200,
            speedMed = 300,
            speedFast = 800,
            speedVFast = 1000;

        $scope.contactForm = {};

        $scope.yes = function() {
          var response = ChatbotService.yes();
        }

        $scope.no = function() {
          var response = ChatbotService.no();
        }

        var keysdown = {},
            scrollTracker = {};

        $scope.submitContactForm = function() {
          var contactForm = JSON.stringify($scope.contactForm);
          return ContactService.sendMessage(contactForm);
        }; 

        init();

        function init() {
          getTimeBasedStyleSheet();
          $('.susie').addClass('animate-in');

          setTimeout(function() {
            $('.susie').removeClass('animate-in');
            $('.susie').addClass('show-animation');
            $('.susie-shadow').addClass('show-animation');
          },1000);
        }

        function makeBackground(time) {
          $('#interactive-cv')
            .removeClass('day night morning evening')
            .addClass('night');
        }

        function getTimeBasedStyleSheet() {
          
          var currentTime = new Date().getHours();
          if (0 <= currentTime&&currentTime < 5) {
            timeOfDay = 'night';
            makeBackground(timeOfDay);
          }
          if (5 <= currentTime&&currentTime < 11) {
            timeOfDay = 'morning';
            makeBackground(timeOfDay);
          }
          if (11 <= currentTime&&currentTime < 16) {
            timeOfDay = 'day';
            makeBackground(timeOfDay);
          }
          if (16 <= currentTime&&currentTime < 22) {
            timeOfDay = 'evening';
            makeBackground(timeOfDay);
          }
          if (22 <= currentTime&&currentTime <= 24) {
            timeOfDay = 'night';
            makeBackground(timeOfDay);
          }
          
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

          /*$(window).on('swipeleft', function() {
            //console.log('swiped left');
          });*/

          var scrollPosition = 0;
          $(window).scroll(function() {
            //dont do the scroll animation if also pressing keys
            if (keysdown.keydown) return;

            scrollTracker.isScrolling = true;
            
            var currentScrolledPosition = $(document).scrollLeft();
              if (scrollPosition > currentScrolledPosition) {
                //console.log('scroll right');
                scrollPosition = currentScrolledPosition;
                activateMovingLeftAnimations();

                // $('.susie-shadow').removeClass('show-animation');
                // $('.susie').removeClass('face-right');
                // $('.susie').addClass('face-left');
                // AnimateService.animateLeft('.susie', 0);

                // AnimateService.animateRight('.med-moving-items', speedMed);
                // AnimateService.animateRight('.slow-moving-items', speedSlow);
                // AnimateService.animateRight('.v-slow-moving-items', speedVSlow);

                setTimeout(function() {
                  stoppedScrolling();
                  scrollTracker.isScrolling = false;
                },500);
              }
              else if (scrollPosition < currentScrolledPosition) {
                //console.log('scroll left');
                scrollPosition = currentScrolledPosition;
                activateMovingRightAnimations();

                // $('.susie-shadow').removeClass('show-animation');
                // $('.susie').removeClass('face-left');
                // $('.susie').addClass('face-right');
                // AnimateService.animateRight('.susie', 0);

                // AnimateService.animateLeft('.med-moving-items', speedMed);
                // AnimateService.animateLeft('.slow-moving-items', speedSlow);
                // AnimateService.animateLeft('.v-slow-moving-items', speedVSlow);


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
              
              setInterval(movTick(), 100); // Setup interval. Delay controlls tickrate.

            });

            // Keyup listener
            $('body').keyup(function(e) {

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

                activateMovingRightAnimations();
                moved = 1;

              }

              if (movLeft) { 
                if(!isValidMove('left')) {
                  return;
                }

                activateMovingLeftAnimations();
                moved = 1;

              }
              

              if (!moved) return false;
                
            }


          });

          
          function activateMovingLeftAnimations() {
            $('.susie-shadow').removeClass('show-animation');
            $('.susie').removeClass('face-right');
            $('.susie').addClass('face-left');
            AnimateService.animateLeft('.susie', 0);

            AnimateService.animateRight('.stars-clouds', 25);

            AnimateService.animateRight('.med-moving-items', speedMed);
            AnimateService.animateRight('.slow-moving-items', speedSlow);
            AnimateService.animateRight('.v-slow-moving-items', speedVSlow);

            if(timeOfDay == 'morning' || timeOfDay == 'evening') {
              AnimateService.animateMoonriseRight('.sun-moon', 25, 25);
            }
            else {
              AnimateService.animateMoonriseRight('.sun-moon', 1, 0);
            }
          }

          function activateMovingRightAnimations() {
            $('.susie-shadow').removeClass('show-animation');
            $('.susie').removeClass('face-left');
            $('.susie').addClass('face-right');
            AnimateService.animateRight('.susie', 0);

            //AnimateService.animateLeft('.sun-moon', 1);
            
            AnimateService.animateLeft('.stars-clouds', 25);

            AnimateService.animateLeft('.med-moving-items', speedMed);
            AnimateService.animateLeft('.slow-moving-items', speedSlow);
            AnimateService.animateLeft('.v-slow-moving-items', speedVSlow);
            //debugger;
            if(timeOfDay == 'morning' || timeOfDay == 'evening') {
              AnimateService.animateMoonriseRight('.sun-moon', 25, 25);
            }
            else {
              AnimateService.animateMoonriseRight('.sun-moon', 1, 0);
            }
          }



      }
        
    ]
  });
  