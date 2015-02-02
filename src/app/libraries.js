// 'use strict';

// angular.module('ccapp')
//     .factory('CountryInfoRequest', ['$http', '$q', 'COUNTRY_CAPITAL_PREFIX', 'COUNTRY_CAPITAL_SUFFIX',
//         function($http, $q, COUNTRY_CAPITAL_PREFIX,  COUNTRY_CAPITAL_SUFFIX){
//             return function(path){
//                 var defer = $q.defer();
//                 $http.get(COUNTRY_CAPITAL_PREFIX +path + COUNTRY_CAPITAL_SUFFIX).success(
//                     function(data){
//                         defer.resolve(data);
//                     });
//                 return defer.promise;
//             };
//         }
//     ])
//     .factory('CountryCodes',['CountryInfoRequest', 'COUNTRY_CAPITAL_CODES', function(CountryInfoRequest, COUNTRY_CAPITAL_CODES){
//         return CountryInfoRequest(COUNTRY_CAPITAL_CODES);
//     }]);