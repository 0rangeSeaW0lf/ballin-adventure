'use strict';

angular.module('ccapp', ['ngAnimate', 'ngSanitize', 'restangular', 'ui.router'])
  .constant('COUNTRY_CAPITAL_PREFIX','http://api.geonames.org/')
  .constant('COUNTRY_CAPITAL_CODES','countryInfoJSON?')
  .constant('COUNTRY_CAPITAL_SUFFIX','username=jmorenor')
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
  })
  .factory('CountryInfoRequest', ['$http', '$q', 'COUNTRY_CAPITAL_PREFIX', 'COUNTRY_CAPITAL_SUFFIX',
    function($http, $q, COUNTRY_CAPITAL_PREFIX,  COUNTRY_CAPITAL_SUFFIX){
      return function(path){
        var defer = $q.defer();
        $http.get(COUNTRY_CAPITAL_PREFIX +path + COUNTRY_CAPITAL_SUFFIX).success(
          function(data){
            defer.resolve(data);
          });
        return defer.promise;
      };
    }
  ])
  .factory('CountryCodes',['CountryInfoRequest', 'COUNTRY_CAPITAL_CODES', function(CountryInfoRequest, COUNTRY_CAPITAL_CODES){
      return CountryInfoRequest(COUNTRY_CAPITAL_CODES).then(function(countryData){
        return countryData;
      });
  }]);
