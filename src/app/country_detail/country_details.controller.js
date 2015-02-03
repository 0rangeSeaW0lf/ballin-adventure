'use strict';

angular.module('ccapp')
  .controller('CountryDetailCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', 'countryInfo', 'searchInfo', function ($scope, $rootScope, $filter, $stateParams, countryInfo, searchInfo) {
    $scope.loading = true;
    $scope.code = $stateParams.country;
    countryInfo.getInformation().then(function(data){
        $scope.countries = data.geonames;
        $scope.loading = false;
    });
    searchInfo.getInformation({featureCode: "PPLC", country: $scope.code })
      .then(function(data){
        console.log(data.length)
        console.log(data.geonames[0]);
      });
  }]);