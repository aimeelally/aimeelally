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
  .module("caramelloApp", [
    "ngRoute",
    "ui.router",
    "services",
    "directives",
    "mp.autoFocus",
    "jtcraddock.simplePopup",
    "pascalprecht.translate",

    //MISC
    "camelCaser"

  ])
  .config([
    "$locationProvider",
    "$routeProvider",
    "$stateProvider",
    "$urlRouterProvider",
    function config($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
      
      $locationProvider.hashPrefix("!");
      $urlRouterProvider.when("", '/camel-caser');

      //MISC
      $stateProvider.state({
        name: "camelCaser",
        url: "/camel-caser",
        component: "camelCaser"
      });

    }
  ]);

  //Route Authorisation
  angular.module('caramelloApp').run([
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