/*

Copyright (C) May 2016 John Craddock


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE John Craddock BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of the John Craddock shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the John Craddock.

*/

(function(){
  'use strict';
        
  var directive = function($templateRequest, $compile){
    var link;
    
    //append html to body element
    var popupHTML = '<div class="popup-modal popup-right" id="popup-right"><div class="popup-content"><div class="content-inner"></div></div></div><div class="popup-modal popup-top" id="popup-top"><div class="popup-content"><div class="content-inner"></div></div></div><div class="popup-modal popup-simple" id="popup-simple"><div class="popup-content"><div class="content-inner"></div></div></div><div class="popup-overlay"></div>';
    
    var fragment = createFragment(popupHTML);
    document.body.insertBefore(fragment, document.body.childNodes[0]);
    
    
    link = function($scope, element, attrs) {
      var sourceURL = attrs.simplePopup,
          targetAction= attrs.popupTarget || 'top',
          target = document.querySelector('#popup-' + targetAction),
          contentContainer = target.querySelector('.content-inner'),
          $target = angular.element(target),
          numbScreens = 0,
          currentScreen,
          filename;

      var PRIMARY_BUTTON_CLASS = 'btn-1'; //a class used to mark primary buttons. Focus will be set to these on screen transitions.
      //delay execution of initialise function until next event loop.
      //Ensures scope of calling view is fully resolved
      setTimeout(initialise,1);

      function initialise(){
        attachEventHandlers();
        setUpPopupObject();
        closeOnStateDestroy();

        $scope.$on('$includeContentLoaded', function () {
          attachClassWatchers();
        });

      } //initialise

      function setUpPopupObject(){
        if (!$scope.popupObject && !attrs.popupObject){
          //if no popupObject is expected, 
          //create and empty one to hang the functionality onto
          $scope.popupObject = {};
        }
        if ($scope.popupObject){
          //$scope.so is a convenience object, saves a bit of typing
          $scope.po = $scope.popupObject;
          attachFunctionsToPopupObject();
        }
        else{
          //if we're still waiting on popupObject to resolve, create a $watch
          $scope.$watch('popupObject', function(newObj){
            if (newObj){
              $scope.po = $scope.popupObject;
              attachFunctionsToPopupObject();     
            }
          });
        }
      }//setUpPopupObject

      function closeOnStateDestroy(){
        $scope.$on('$destroy',function(){
          if ($target.attr('filename') === filename){
            closePopup();
          }
        });
      }//closeOnStateDestroy

      function addTemplateName(templateURL){
        var match = templateURL.match(/[^\/]*.html/);
        filename = match[0].substring(0,match[0].indexOf('html')-1);
        $target.addClass(filename);
        $target.attr('filename', filename);
      }//getTemplateName

      function removeTemplateName(){
        $target.removeClass(filename);
        $target.removeAttr('filename');
      }//removeTemplateName
       

      function closePopup(){
        removeTemplateName();
        removeMoveClasses();
        currentScreen = undefined;
        if ($scope.popupObject && $scope.popupObject.reset){
          $scope.popupObject.reset();
        }
        $target.removeClass('popup-show');
        contentContainer.innerHTML = '';
        $compile(contentContainer)($scope);
      }//closepopup

      function showPopup(content){
        addTemplateName(sourceURL);
        currentScreen = 1;
        contentContainer.innerHTML = content;
        $compile(contentContainer)($scope);
        $target.addClass('popup-show');

        var thisRenderedScreen = contentContainer.getElementsByTagName('section')[0];
        setTimeout(addAriaTags(contentContainer),200);
        setTimeout(setFocus(thisRenderedScreen),2000);
        //setFocus(thisRenderedScreen);
        
        warnIfpopupObjectMissing();

        //run init function if present
        if ($scope.popupObject && $scope.popupObject.init){
          $scope.popupObject.init(attrs);
        }

        //warn and run start function if present
        if ($scope.popupObject && $scope.popupObject.start){
          console.warn('simple popup start function depricated, use init');
          $scope.popupObject.start(attrs);
        }

        attachClassWatchers();
        
      } //showPopup

      function addAriaTags(container){
        var dialogs = container.getElementsByTagName('section');
        for (var count = 0; count < dialogs.length; count++){
          dialogs[count].setAttribute('aria-dialog','');
        }
      }//addAriaTags

      function setFocus(section){
        if(!section){
          //if popup is closed before this happens do nothing.
          return;
        }
        //get the first input element
        var firstInputElement = section.getElementsByTagName('input')[0];
        //does it exist?
        if(firstInputElement){
          //if so, focus on it - timeout required so the element to focus has rendered.
          setTimeout(function(){
            firstInputElement.focus();
          },200);
        }
        //if not, get first primary button
        else{
          var firstPrimaryBtn = section.querySelector('.' + PRIMARY_BUTTON_CLASS);
          //does that exist?
          if(firstPrimaryBtn){
            //if so, focus on it - timeout required so the element to focus has rendered.
            setTimeout(function(){
              firstPrimaryBtn.focus();
            },200);
          }
        }
        
      }//setFocus

      function getScreenNumber(){
        return currentScreen;
      } //getScreenNumber

      function isOpen(){
        return !!currentScreen;
      } //isOpen

      function attachClassWatchers(){
        [1,2,3,4,5].forEach(attachGoToScreenWatcher);
        attachCloseWatcher();
        attachNextScreenWatcher();
        attachPrevScreenWatcher();
      }

      function warnIfpopupObjectMissing(){
        if (!$scope.popupObject){
          console.warn('Simple Popup: Unable to resolve popup object.');
        }
      }//warnIfpopupObjectMissing

      function attachCloseWatcher(){
        var closeButtons = target.querySelectorAll('.popup-close');
        [].forEach.call(closeButtons, function(closeButton){
          var $closeButton = angular.element(closeButton);
          if ($closeButton.hasClass('popup-close-watcher')){
            return;
          }
          $closeButton.addClass('popup-close-watcher');
          $closeButton.on('click', closePopup);
        });
      }

      function attachGoToScreenWatcher(numb){
        var btn = target.querySelectorAll('.go-to-screen-'+numb);
        [].forEach.call(btn, function(button){
          var $button = angular.element(button);
          if ($button.hasClass('popup-go-watcher')){
            return;
          }
          $button.addClass('popup-go-watcher');
          $button.on('click', function(){
            goToScreen(numb);
          });
        });
      }

      function attachNextScreenWatcher(){
        var btn = target.querySelectorAll('.go-to-next');
        [].forEach.call(btn, function(button){
          var $button = angular.element(button);
          if ($button.hasClass('popup-next-watcher')){
            return;
          }
          $button.addClass('popup-next-watcher');
          $button.on('click', function(){
            goToNextScreen();
          });
        });
      }

      function attachPrevScreenWatcher(){
        var btn = target.querySelectorAll('.go-to-prev');
        [].forEach.call(btn, function(button){
          var $button = angular.element(button);
          if ($button.hasClass('popup-prev-watcher')){
            return;
          }
          $button.addClass('popup-prev-watcher');
          $button.on('click', function(){
            goToPrevScreen();
          });
        });
      }

      function goToScreen(numb){
        //removed this test during a bug fix
        /*if (numb > numbScreens){
          console.warn('Only ' + numbScreens + ' screens available.');
          return;
        }
        if (numb <= 0){
          console.warn('No non natural numbered screens');
          return;
        }*/
        removeMoveClasses();
        currentScreen = numb;
        $target.addClass('screen-'+numb);

        
        setTimeout(function(){
          var thisRenderedScreen = target.getElementsByTagName('section')[numb - 1];
          setFocus(thisRenderedScreen);
        },1000);//needs a longer timeout to focus correctly, moving focus during a css transition caused a bug in Chrome

      }//goToScreen

      function goToNextScreen(){
        goToScreen(currentScreen + 1);
      }

      function goToPrevScreen(){
        goToScreen(currentScreen - 1);
      }
      
      function removeMoveClasses(){
        $target.removeClass('screen-1');
        $target.removeClass('screen-2');
        $target.removeClass('screen-3');
        $target.removeClass('screen-4');
        $target.removeClass('screen-5');
      }//removeMoveClasses

      function getScreenClass(ns){
        if (ns === 1){
          return 'full-width';
        }
        if (ns === 2){
          return 'double-width';
        }
        if (ns === 3){
          return 'triple-width';
        }
        if (ns === 4){
          return 'quadruple-width';
        }
        if (ns === 5){
          return 'quintuple-width';
        }
      }

      function getAndSetupTemplate(){
        return $templateRequest(sourceURL).then(function(template) {
            var templateFragment = createFragment(template),
                children = templateFragment.childNodes,
                count = 0,
                startString, endString;
            numbScreens = 0;
            for (count = 0; count<children.length; count++){
              //var a = angular.element(children[count]);
              if (children[count].tagName && children[count].tagName.toLowerCase() === 'section'){
                //debugger;
                numbScreens += 1;
                angular.element(children[count]).addClass('popup-screen');
              }
            }
            numbScreens = numbScreens = 0 ? 1 : numbScreens;
            startString = '<div class="popup-container '+getScreenClass(numbScreens)+'"><div class="popup-row">';
            endString = '</div> <!-- /popup-row --></div> <!-- /popup-container -->';

            return startString + template + endString;
          }, function() {
              //error loading template
          });
      }//getTemplate

      function openpopupProgramatically(){
        getAndSetupTemplate()
        .then(showPopup);
      }
      
      function attachEventHandlers(){
        //show popup on click
        element.on('click', function(){
          getAndSetupTemplate()
          .then(showPopup);
        });

        //show popup on load if popup-on-load attribute is present
        if (attrs.popupOnLoad !== undefined){
          console.ward('popup-on-load depricated, use open-immediately');
          getAndSetupTemplate()
          .then(showPopup);
        }
        //show popup on load if popup-on-load attribute is present
        if (attrs.openImmediately !== undefined){
          getAndSetupTemplate()
          .then(showPopup);
        } 
      }
      
      function attachFunctionsToPopupObject(){
        if ($scope.popupObject){
          //attach screen move & close events to popupObject, if it's present
          $scope.popupObject.close = closePopup;
          $scope.popupObject.open = openpopupProgramatically;
          $scope.popupObject.goToScreen = goToScreen;
          $scope.popupObject.goToNextScreen = goToNextScreen;
          $scope.popupObject.goToPrevScreen = goToPrevScreen;
          $scope.popupObject.getScreenNumber = getScreenNumber;
          $scope.popupObject.isOpen = isOpen;
          $scope.popupObject.close = closePopup;
        }
      }// /attachFunctionsTopopupObject
        
      

    };
    return {
      restrict: 'A',
      scope: {
        popupObject: '=?'
      },
      link: link
    };

  };

  angular.module('jtcraddock.simplePopup', [])
  .directive('simplePopup',['$templateRequest', '$compile', directive]);

  function createFragment(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
  }
}());