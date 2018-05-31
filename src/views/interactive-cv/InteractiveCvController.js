"use strict";

angular.module("interactiveCv", [])
  .component("interactiveCv", {
    template: require("./interactive-cv.html"), 
    controller: [ '$scope',
      function InteractiveCvController($scope) {
        
        $(document).ready(function(){
            
            var windowHeight = $(window).height();
            $('.setPageHeight')
                .css('height', windowHeight);

            var keysdown = {};
            var hasMadeFirstMove = false;
            var speedVSlow = 5,
                speedSlow = 200,
                speedMed = 300,
                speedFast = 800,
                speedVFast = 1000;


            function animateRight(element, distance) {
              console.log($('.ground-container').offset().left);
              if(!isValidMove(element, distance)) {
                return;
              }
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
              console.log($('.ground-container').offset().left)
              if(!isValidMove(element, distance)) {
                return;
              }
              $(element)
                .addClass('left')
                .removeClass('right down up')
                .stop()
                .animate({
                   left: '-='+distance
               });
            }

            function isValidMove(el, dist) {
              return true;
              // console.log($('.ground-container').offset().left)
              //   console.log($('.ground-container').offset().left - dist)
              // if($('.ground-container').offset().left <= 0) {
              //   return true;
              // }
              // if($('.ground-container').offset().left - dist <= -200) {
              //   return true;
              // }
              // else {
              //   console.log($('.ground-container').offset().left)
              //   console.log($('.ground-container').offset().left - dist)
              // }
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
                
                $('.susie').removeClass('face-left');
                $('.susie').addClass('face-right');
                animateRight('.susie', 0);
                
                animateLeft('.med-moving-items', speedMed);
                animateLeft('.slow-moving-items', speedSlow);
                animateLeft('.v-slow-moving-items', speedVSlow);

              }
              else if(e.keyCode == 37 || e.keyCode == 40) { // left or down key
               
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
              $('.susie').removeClass('right left');
            });
          });



      }
        
    ]
  });
  
  //