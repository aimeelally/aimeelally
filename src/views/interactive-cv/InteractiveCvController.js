"use strict";

import ARRAY_OF_ELEMENTS from './elements';
import LIKES from './likes';

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

angular.module("interactiveCv", [])
  .component("interactiveCv", {
    template: require("./interactive-cv.html"), 
    controller: [ '$scope', 'ContactService', 'ChatbotService', 'AnimateService', "AnalyticsService", "ChartsService",
      function InteractiveCvController($scope, ContactService, ChatbotService, AnimateService, AnalyticsService, ChartsService) {

        const FARTHEST_POINT_LEFT = 200;
        const FARTHEST_POINT_RIGHT = -7000;

        // $scope.showFirstSpeechBubble = false;
        // $scope.showSecondSpeechBubble = false;
        // $scope.showThirdSpeechBubble = false;

        var timeOfDay = '';
        var movLeft = 0;
        var movRight = 0;
        var speedVSlow = 0,
            speedMedSlow = 100,
            speedSlow = 200,
            speedMed = 300,
            speedFast = 800,
            speedVFast = 1000;

        //var arrOfElements = 

        $scope.contactForm = {};
        $scope.mobile = jQuery.browser.mobile;

        $scope.yesShesLooking = function() {
          var response = ChatbotService.yesShesLooking();
          $('.susie').removeClass('right left face-right face-left');
          $('.susie').addClass('happy');
          showSpeechBubble(2)
        }

        $scope.noShesNotLooking = function() {
          var response = ChatbotService.noShesNotLooking();
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('angry');
          showSpeechBubble(3);
        }

        $scope.activateSusieDetails = function() {
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('looking-up');
          showSpeechBubble(4);
        }
        $scope.activateSusieEducation = function() {
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('looking-up');
          showSpeechBubble(5);
        }
        $scope.activateSusieWorkExp = function() {
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('looking-up');
          showSpeechBubble(6);
        }
        $scope.activateSusieSkills = function() {
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('looking-up');
          showSpeechBubble(7);
        }
        $scope.activateSusieTestimonials = function() {
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('looking-up');
          showSpeechBubble(8);
        }
        $scope.activateSusieContact = function() {
          $('.susie').removeClass('right left face-left face-right');
          $('.susie').addClass('looking-up');
          showSpeechBubble(9);
        }

        var keysdown = {},
            scrollTracker = {};

        $scope.submitContactForm = function() {
          var contactForm = JSON.stringify($scope.contactForm);
          return ContactService.sendMessage(contactForm);
        }; 

        init();

        function init() {
          //debugger;
          testchart();
          //debugger;
          getTimeBasedStyleSheet();
          $('.susie').addClass('animate-in');

          setTimeout(function() {
            $('.susie').removeClass('animate-in');
            $('.susie').addClass('show-animation');
            $('.susie-shadow').addClass('show-animation');
          },1000);

          showSpeechBubble(1);

          //$scope.showFirstSpeechBubble = true;
        }


        function testchart() {
          var colors = ['red', 'yellow'];
          var data = LIKES;
          ChartsService.buildGroupedBarChart(data, '#activeSchoolsAndTeachersChart', 'likes', colors);
        }





        function showSpeechBubble(num) {
          // var speechBubbleToShow = 'showSpeechBubble'+num;

          // $scope.showSpeechBubble1 = false;
          // $scope.showSpeechBubble2 = false;
          // $scope.showSpeechBubble3 = false;
          // $scope.showSpeechBubble4 = false;
          // for(speechBubble in speechBubbles) {
          //   speechBubble = false;
          // }
          // speechBubbles.speechBubbleToShow = true;
          //debugger;
          $scope.speechBubbleToShow = num;
        }


        function makeBackground(time) {
          $('#interactive-cv')
            .removeClass('day night morning evening')
            .addClass(time);
        }

        function getTimeBasedStyleSheet() {
          
          var currentTime = new Date().getHours();

          // 12AM - 4:59AM
          if (0 <= currentTime&&currentTime < 5) {
            timeOfDay = 'night';
            makeBackground(timeOfDay);
          }
          // 5AM - 10:59AM
          if (5 <= currentTime&&currentTime < 11) {
            timeOfDay = 'morning';
            makeBackground(timeOfDay);
          }
          // 11AM - 3:59PM
          if (11 <= currentTime&&currentTime < 16) {
            timeOfDay = 'day';
            makeBackground(timeOfDay);
          }
          // 4PM - 9:59PM
          if (16 <= currentTime&&currentTime < 22) {
            timeOfDay = 'evening';
            makeBackground(timeOfDay);
          }
          // 10PM - 11:59PM
          if (22 <= currentTime&&currentTime <= 24) {
            timeOfDay = 'night';
            makeBackground(timeOfDay);
          }
          
        }

        function isValidMove(direction) {
          var susieCurrPosition = $('.susie').offset().left;
          var docWidth = $(document).width();
          var susiePercentagePosOfWidth = +(susieCurrPosition/docWidth*100).toFixed(3);
          //debugger;
          if(direction === 'left' && susiePercentagePosOfWidth <= 0.1) {
            return false;
          }
          if(direction === 'right' && susiePercentagePosOfWidth >= 99) {
            return false;
          }

          return true;
        }

        /*function isValidMove(direction) {
          return true; //until i can get the function to work correctly
          
          var blockerPosition = $("#stop-scroll").offset().left;
          var blockerPositionAfterMove = blockerPosition - speedMed;
          //console.log(blockerPositionAfterMove);
          // var blockerPositionFromContact = ($(window).width() - ($('#contact').offset().left + $('#contact').outerWidth()));
          // var blockerPositionAfterContact = blockerPositionFromContact - speedMed;
          
          if(direction === 'left' && blockerPositionAfterMove <= FARTHEST_POINT_LEFT) {
            return true;
          }
          if(direction === 'right' && blockerPositionAfterMove >= FARTHEST_POINT_RIGHT) {
            return true;
          }

          return;

        }*/

        function stoppedScrolling() {
          $('.susie').removeClass('right left happy angry');
          $('.susie-shadow').addClass('show-animation');
        }


        $(document).ready(function(){

          var scrollPosition = 0;
          $(window).scroll(function() {
            //dont do the scroll animation if also pressing keys
            if (keysdown.keydown) return;

            

            scrollTracker.isScrolling = true;
            
            var currentScrolledPosition = $(document).scrollLeft();
              if (scrollPosition > currentScrolledPosition) {

                if(!isValidMove('right')) {
                  return;
                }
                //console.log('scroll right');
                scrollPosition = currentScrolledPosition;
                activateMovingLeftAnimations();

                setTimeout(function() {
                  stoppedScrolling();
                  scrollTracker.isScrolling = false;
                },500);
              }
              else if (scrollPosition < currentScrolledPosition) {

                if(!isValidMove('left')) {
                  return;
                }

                //console.log('scroll left');
                scrollPosition = currentScrolledPosition;
                activateMovingRightAnimations();

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

              $('.susie').removeClass('right left happy angry');
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
          // end of doc ready func
          

          
          function activateMovingLeftAnimations() {
            $('.susie-shadow').removeClass('show-animation');
            $('.susie').removeClass('face-right');
            $('.susie').addClass('face-left');

            AnimateService.animateLeft('.susie', 0);
            AnimateService.animateArrayOfElementsRight(ARRAY_OF_ELEMENTS);

            if(timeOfDay == 'morning' || timeOfDay == 'evening') {
              AnimateService.animateMoonriseRight('.sun-moon', 40, 10);
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
            AnimateService.animateArrayOfElementsLeft(ARRAY_OF_ELEMENTS);

            if(timeOfDay == 'morning' || timeOfDay == 'evening') {
              AnimateService.animateMoonriseRight('.sun-moon', 10, 10);
            }
            else {
              AnimateService.animateMoonriseRight('.sun-moon', 1, 0);
            }
          }

          //////////////////



          /*function isElementInViewport(elem) {
              var $elem = $(elem);

              // Get the scroll position of the page.
              var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
              var viewportTop = $(scrollElem).scrollTop();
              var viewportBottom = viewportTop + $(window).height();

              if($elem.length) {
                // Get the position of the element on the page.
                var elemTop = Math.round( $elem.offset().top );
                var elemBottom = elemTop + $elem.height();

                return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
              }
              
          }*/

          function isElementInViewport(elem) {
              var $elem = $(elem);

              // Get the scroll position of the page.
              var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
              var viewportLeft = $(scrollElem).scrollLeft();
              var viewportRight = viewportLeft + $(window).width();

              if($elem.length) {
                // Get the position of the element on the page.
                var elemLeft = Math.round( $elem.offset().left );
                var elemRight = elemLeft + $elem.width();

                //debugger;

                return ((elemLeft < viewportRight) || (elemRight > viewportLeft));
              }
              
          }

          // Check if it's time to start the animation.
          function checkAnimation() {
              var $elem = $('.section-container.details');

              if (isElementInViewport($elem)) {
                  // Start the animation
                  $elem.addClass('start');
              } 
              // else {
              //     $elem.removeClass('start');
              // }
          }

          // Capture scroll events
          $(window).scroll(function(){
              checkAnimation();
          });









          ///////////////////////



      }
        
    ]
  });
  