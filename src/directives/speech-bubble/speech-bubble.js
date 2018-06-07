export default function speechBubble($state) {

  
  
  var controller = ['$scope', '$element', '$state', function ($scope, $element, $state) {
    
    var speechBubbles = Array.prototype.slice.call(document.querySelectorAll('speech-bubble'));
    $scope.index = getThisSpeechBubblesIndex() + 1;
    $scope.trianglePosition = getTrianglePosition();

    function getTrianglePosition() {
      return 'btm-left-in';
    };

    function getThisSpeechBubblesIndex() {
      return speechBubbles.findIndex(matchesContent);
    }

    function matchesContent(bubble) {
      if(bubble.outerHTML.indexOf('}}') > -1) {
        //translations have not yet rendered
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.index = getThisSpeechBubblesIndex() + 1;
          });
        }, 50);
      }
      else {
        return bubble.outerHTML.indexOf($scope.bubbleContent) > -1;
      }
      
    }

  }];

  return {
    restrict: 'E',
    controller: controller,
    scope: {
      bubbleContentOne: '@bubbleContentOne',
      bubbleContentTwo: '@bubbleContentTwo',
      bubbleContentThree: '@bubbleContentThree',
      bubbleContentFour: '@bubbleContentFour',
      bubbleContentFive: '@bubbleContentFive',
      firstChoiceAction: '&',
      firstChoiceContent: '@firstChoiceContent',
      secondChoiceAction: '&',
      secondChoiceContent: '@secondChoiceContent'
    },
    templateUrl: './directives/speech-bubble/speech-bubble.html'
  };
  
}





