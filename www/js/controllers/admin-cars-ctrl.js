angular.module('ihc-project')
.controller('AdminCarsCtrl', function ($scope, $ionicModal) {
  function carViewModel() {
    this.option = undefined;

    this.name = undefined;
    this.brand = undefined;
    this.price = undefined;
    this.quantity = undefined;
  }

  $scope.cars = [];

  $scope.loadCars = function () {
    $scope.cars = [];
  };

  $scope.carData = new carViewModel();

  $ionicModal.fromTemplateUrl('templates/admin-edit-car.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editModal = modal;
  });

  $scope.closeEdit = function() {
    $scope.editModal.hide();
  };

  $scope.edit = function() {
    $scope.editModal.show();
  };

  $scope.editCar = function(car) {
    $scope.closeEdit();
  };

  $ionicModal.fromTemplateUrl('templates/admin-create-car.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.createModal = modal;
  });

  $scope.closeCreate = function() {
    $scope.createModal.hide();
  };

  $scope.create = function() {
    $scope.createModal.show();
  };

  $scope.createCar = function(car) {
    $scope.closeCreate();
  };

  $scope.deleteCar = function () {

  };
}).directive('admin-car-form', function () {
  return {
    restrict: 'E',
    scope: { car: '=car' },
    templateUrl: 'templates/admin-car-form.html'
  };
});
