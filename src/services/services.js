'use strict';

// directives with @es6 dependency injection
import SampleService from './SampleService';
import CamelService from './CamelService';

//import BuilderService from './BuilderService';
//export { default as BuilderService } from './BuilderService'; // as a service

angular.module('services', [])
  .service('SampleService', SampleService)
  .service('CamelService', CamelService);
