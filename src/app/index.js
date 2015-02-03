'use strict';

angular.module('ccapp', ['ngAnimate', 'ngSanitize', 'restangular', 'ui.router'])
  .constant('COUNTRY_CAPITAL_PREFIX','http://api.geonames.org/')
  .constant('COUNTRY_CAPITAL_CODES','countryInfoJSON?')
  .constant('COUNTRY_CAPITAL_SUFFIX','username=jmorenor')
  .constant('COUNTRY_CAPITAL_JSON','JSON?')
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
        url: '/countries/:country',
        templateUrl: 'app/country_detail/country_detail.html',
        controller: 'CountryDetailCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .factory('countryInfoRequest', ['$http', '$q', 'COUNTRY_CAPITAL_PREFIX', 'COUNTRY_CAPITAL_SUFFIX',
    function($http, $q, COUNTRY_CAPITAL_PREFIX,  COUNTRY_CAPITAL_SUFFIX){
      return function(path){
        var defer = $q.defer();
        $http.get(COUNTRY_CAPITAL_PREFIX + path + COUNTRY_CAPITAL_SUFFIX, { cached: true }).success(
          function(data){
            defer.resolve(data);
          });
        return defer.promise;
      };
    }
  ])
  .factory('countryInfo',['countryInfoRequest', 'COUNTRY_CAPITAL_CODES',
    function(countryInfoRequest, COUNTRY_CAPITAL_CODES){
      return {
        getInformation: function() {
          return countryInfoRequest(COUNTRY_CAPITAL_CODES);
        }
      };
    }
  ])
  .factory('searchInfo',['countryInfoRequest', 'COUNTRY_CAPITAL_JSON',
    function(countryInfoRequest, COUNTRY_CAPITAL_JSON){
      return {
        getInformation: function(type, params) {
          // name=Amsterdam&featureCode=PPLC&country=NL&
          var string = "";
          var params_keys = Object.keys(params);
          for(var i = 0; i < params_keys.length; i++){
            string += params_keys[i] + "=" + params[params_keys[i]] + "&";
          }
          return countryInfoRequest(type + COUNTRY_CAPITAL_JSON + string);
        }
      };
    }
  ]);

