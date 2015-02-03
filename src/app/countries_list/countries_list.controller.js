'use strict';

angular.module('ccapp')
  .controller('CountryListCtrl', ['$scope', '$location', '$rootScope', 'countryInfo', function ($scope, $location, $rootScope, countryInfo) {
      $scope.loading = true;
      countryInfo.getInformation().then(function(data){
        $scope.countries = data.geonames;
        $scope.loading = false;
      });
      $scope.go = function(country){
        $rootScope.country = country;
        $location.path('/countries/' + country.countryCode);
      };
  }]);