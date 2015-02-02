'use strict';

angular.module('ccapp', ['ngAnimate', 'ngSanitize', 'restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('country-list', {
        url: '/countries',
        templateUrl: 'app/countries_list/countries_list.html',
        controller: 'CountryListCtrl'
      })
      .state('country-detail',{
        url: '/countries/:country/capital',
        templateUrl: 'app/country_detail/country_detail.html',
        controller: 'CountryDetailCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
