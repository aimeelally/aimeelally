'use strict';

// directives with @es6 dependency injection
import SampleService from './SampleService';
import AnalyticsService from './AnalyticsService';
import ChartsService from './ChartsService';
import ContactService from './ContactService';
import ChatbotService from './ChatbotService';
import AnimateService from './AnimateService';
import HelperFunctions from './HelperFunctions';

//import BuilderService from './BuilderService';
//export { default as BuilderService } from './BuilderService'; // as a service

angular.module('services', [])
  .service('SampleService', SampleService)
  .service('AnalyticsService', AnalyticsService)
  .service('ChartsService', ChartsService)
  .service('ContactService', ContactService)
  .service('ChatbotService', ChatbotService)
  .service('AnimateService', AnimateService)
  .service('HelperFunctions', HelperFunctions);
