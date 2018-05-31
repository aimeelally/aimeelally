'use strict';
import angular from "angular";
import angularRoute from "angular-route";
import angularUIRouter from "angular-ui-router";
import angularSimplePopup from 'angular-simple-popup';
import angularAutoFocus from 'angular-auto-focus';
import angularTranslate from 'angular-translate';

import Styles from './global-css';
import directives from './directives/directives';
import * as services from './services/services';
import * as controllers from "./views";

angular
  .module("aimeeLallyApp", [
    "ngRoute",
    "ui.router",
    "services",
    "directives",
    "mp.autoFocus",
    "jtcraddock.simplePopup",
    "pascalprecht.translate",

    //MISC
    "landingPage",
    "interactiveCv"

  ])
  .config([
    "$locationProvider",
    "$routeProvider",
    "$stateProvider",
    "$urlRouterProvider",
    function config($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
      
      $locationProvider.hashPrefix("!");
      $urlRouterProvider.when("", '/interactive-cv');

      //MISC
      $stateProvider.state({
        name: "landingPage",
        url: "/landing-page",
        component: "landingPage"
      });

      $stateProvider.state({
        name: "interactiveCv",
        url: "/interactive-cv",
        component: "interactiveCv"
      });

    }
  ]);

  //Route Authorisation
  angular.module('aimeeLallyApp').run([
      '$rootScope',
      '$state',
      '$window',
    function(
      $rootScope,
      $state,
      $window
    ){
      

  }]);
  // /Route Authorisation