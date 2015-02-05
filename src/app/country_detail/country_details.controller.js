'use strict';

angular.module('ccapp')
  .controller('CountryDetailCtrl', ['$scope', 'country', '$stateParams', 'countryInfo', 'searchInfo', 
    function ($scope, country, $stateParams, countryInfo, searchInfo) {
    $scope.loading = true;
    $scope.code = $stateParams.country;
    $scope.country = country;
    searchInfo.getInformation("search", { featureCode: "PPLC", country: $scope.code })
      .then(function(data){
        $scope.capital = data.geonames[0];
        searchInfo.getInformation("timezone", {lat: $scope.capital.lat, lng: $scope.capital.lng })
          .then(function(data){
            $scope.timezone = data.timezoneId;
        });
      });
    searchInfo.getInformation("neighbours", {country: $scope.code })
      .then(function(data){
        $scope.neighbours = data.geonames;
      });
  }]);