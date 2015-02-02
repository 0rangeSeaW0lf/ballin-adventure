'use strict';

angular.module('ccapp')
  .controller('CountryListCtrl', ['$scope', 'CountryCodes', function ($scope, CountryCodes) {
      $scope.loading = true;
      CountryCodes();
  }]);