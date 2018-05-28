export default function sampleDirective() {
  
  var controller = ['$scope', '$element', function ($scope, $element) {
    
    var speechBubbles = Array.prototype.slice.call(document.querySelectorAll('speech-bubble'));
    $scope.index = getThisSpeechBubblesIndex() + 1;

    function getThisSpeechBubblesIndex() {
      return speechBubbles.findIndex(matchesContent);
    }

    function matchesContent(bubble) {
      return bubble.outerHTML.indexOf($scope.bubbleContent) > -1;
    }

  }];

  return {
    restrict: 'E',
    controller: controller,
    scope: {
      bubbleContent: '@bubbleContent'
    },
    template: `<div class="index-{{index}} fade-in talk-bubble tri-right border round btm-left-in">
                <p class="talktext">{{bubbleContent}}</p>
              </div>`
  };
  
}





