// directives with @es6 dependency injection
import sampleDirective from './sample-directive/sample-directive';
import speechBubble from './speech-bubble/speech-bubble';

angular.module('directives', [])
  .directive('sampleDirective', sampleDirective)
  .directive('speechBubble', speechBubble);
  
