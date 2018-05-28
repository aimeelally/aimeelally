"use strict";

import TEST from "./camel-caser.html";

angular.module("camelCaser", [])
	.component("camelCaser", {
		template: require("./camel-caser.html"), 
		controller: [ '$scope', 'CamelService',
			function CamelCaserController($scope, CamelService) {
				
        var loremIpsum = "Lorem ip-sum, adipiscing elit.";

        $scope.standardCamelCaseConversion = false;
        $scope.stripSpecialCharacters = false;
        $scope.stripNumbers = false;
        $scope.capitaliseFirstLetter = false;
        $scope.stripHTML = false;
        $scope.returnAsObject = false;

        $scope.inputText = '';
        $scope.outputText = '';
        

        $scope.startStrip = function() {
          $scope.outputText = strip($scope.inputText);
        }

        $scope.copyToClipboard = function(val) {

          var copyText = document.getElementById('copyArea');
          copyText.select();
          document.execCommand("Copy");
          alert("Copied the text: " + copyText.value);

        }

        function strip(str) {
          
          var outputText = str;

          if ($scope.returnAsObject) {
            outputText = createMultilineObject(outputText);
            return outputText;
          }

          if ($scope.stripHTML) {
            outputText = CamelService.stripHTML(outputText);
          }

          if ($scope.standardCamelCaseConversion) {
            outputText = CamelService.convertToCamelCase(outputText);
          }

          if ($scope.stripSpecialCharacters) {
            outputText = CamelService.stripSpecialCharacters(outputText);
          }

          if ($scope.stripNumbers) {
            outputText = CamelService.stripNumbers(outputText);
          }

          if ($scope.capitaliseFirstLetter) {
            outputText = CamelService.capitaliseFirstLetter(outputText);
          }

          return outputText;

        }


        

        function turnInputAndOutputIntoObect(input, output) {
          var prettyObject = {[output]: input}; 

          return JSON.stringify(prettyObject, undefined, 2);
        }

        function createMultilineObject(input) {
          
          var cleanInput = CamelService.stripHTML(input);          
          var arrayOfCleanInput = CamelService.getArrayOfTextFromStrippedHtml(cleanInput);
          var newObj = {};

          arrayOfCleanInput.reduce(function(curr,pre) {
            
            var key = pre;

            if ($scope.stripHTML) {
              key = CamelService.stripHTML(key);
            }

            if ($scope.standardCamelCaseConversion) {
              key = CamelService.convertToCamelCase(key);
            }

            if ($scope.stripSpecialCharacters) {
              key = CamelService.stripSpecialCharacters(key);
            }

            if ($scope.stripNumbers) {
              key = CamelService.stripNumbers(key);
            }

            if ($scope.capitaliseFirstLetter) {
              key = CamelService.capitaliseFirstLetter(key);
            }
            
            if(newObj[key]) {
              return;
            }
            newObj[key] = pre;
            return newObj;

          },{});

          return JSON.stringify(newObj, undefined, 2);
          

        }


			}
		]
	});
	
  //([!@#$%\/^&._,*])