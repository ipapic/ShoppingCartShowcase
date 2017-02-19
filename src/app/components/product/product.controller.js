(function () {
  'use strict';

  angular.module('app')
    .controller('ProductController', ProductController);

  /** @ngInject */
  function ProductController($scope, product, localStorageService) {
    var vm = this;

    vm.product = product;
    vm.quantity = 1;

    vm.close = close;
    vm.addToCart = addToCart;
    vm.changeQty = changeQty;

    activate();

    ////////////////////

    function activate() {
    }

    function close() {
      $scope.$dismiss();
    }

    function addToCart() {
      localStorageService.addToCart(vm.product.id, vm.quantity);
      $scope.$close();
    }

    /**
     * change quantity of product units in cart
     * @param increase: bool - increase or decrease quantity
     */
    function changeQty(increase) {
      increase ? vm.quantity++ : vm.quantity--;
    }
  }
})();
