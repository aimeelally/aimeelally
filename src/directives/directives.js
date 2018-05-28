// directives with @es6 dependency injection
import sampleDirective from './sample-directive/sample-directive';

angular.module('directives', [])
  .directive('sampleDirective', sampleDirective);
  
