'use strict';

angular.module('ccapp')
  .controller('CountryListCtrl', ['$scope', 'countryInfo', function ($scope, countryInfo) {
      $scope.loading = true;
      countryInfo.getInformation().then(function(data){
        $scope.countries = data.geonames;
      });
  }]);