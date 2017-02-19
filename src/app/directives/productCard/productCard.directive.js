(function () {
  'use strict';

  angular
    .module('app')
    .directive('productCard', productCard)
    .controller('ProductCardDirectiveController', ProductCardDirectiveController);

  /** @ngInject */

  function productCard() {
    return {
      restrict: 'E',
      scope: {
        product: "="
      },
      replace: true,
      controller: ProductCardDirectiveController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/directives/productCard/productCard.html'
    };
  }

  /** @ngInject */
  function ProductCardDirectiveController($scope, commonService) {
    var vm = this;

    vm.product = $scope.product;

    vm.openProductModal = openProductModal;


    activate();

    ////////////////////////

    function activate() {
    }

    /**
     * open detailed product display
     */
    function openProductModal() {
      commonService.openProductModal(vm.product);
    }
  }
}());
