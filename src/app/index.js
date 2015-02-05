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
        controller: 'CountryDetailCtrl',
        resolve: {
          country: function(countryInfo, $location, $filter, $stateParams){
            return countryInfo.getInformation().then(function(countries){
              var checkCountryCode = $filter('filter')(countries, {countryCode: $stateParams.country});
              if (!checkCountryCode.length) {
                location.path("/countries");
              }
              return checkCountryCode[0];
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .factory('countryInfoRequest', ['$http', '$q', 'COUNTRY_CAPITAL_PREFIX', 'COUNTRY_CAPITAL_SUFFIX',
    function($http, $q, COUNTRY_CAPITAL_PREFIX,  COUNTRY_CAPITAL_SUFFIX){
      return function(path,obj){
        var defer = $q.defer();
        $http.get(COUNTRY_CAPITAL_PREFIX + path + COUNTRY_CAPITAL_SUFFIX, { cached: true, params: obj }).success(
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
          return countryInfoRequest(COUNTRY_CAPITAL_CODES).then(function(data){
            return data.geonames;
          });
        }
      };
    }
  ])
  .factory('searchInfo',['countryInfoRequest', 'COUNTRY_CAPITAL_JSON',
    function(countryInfoRequest, COUNTRY_CAPITAL_JSON){
      return {
        getInformation: function(type, params) {
          return countryInfoRequest(type + COUNTRY_CAPITAL_JSON, params);
        }
      };
    }
  ])
  .run(function($rootScope, $state, $timeout) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $state.go("home");
    });
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });
  });

