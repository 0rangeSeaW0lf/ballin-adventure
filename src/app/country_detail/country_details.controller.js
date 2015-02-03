'use strict';

angular.module('ccapp')
  .controller('CountryDetailCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', 'countryInfo', 'searchInfo', function ($scope, $rootScope, $filter, $stateParams, countryInfo, searchInfo) {
    $scope.loading = true;
    $scope.code = $stateParams.country;
    countryInfo.getInformation().then(function(data){
        $scope.countries = data.geonames;
        $scope.loading = false;
    });
    searchInfo.getInformation("search", {featureCode: "PPLC", country: $scope.code })
      .then(function(data){
        $scope.capital = data.geonames[0];
        searchInfo.getInformation("timezone", {lat: $scope.capital.lat, lng: $scope.capital.lng })
          .then(function(data){
            console.log(data);
            $scope.timezone = data.timezoneId;
        });
      });
    searchInfo.getInformation("neighbours", {country: $scope.code })
      .then(function(data){
        $scope.neighbours = data.geonames;
      });
  }]);