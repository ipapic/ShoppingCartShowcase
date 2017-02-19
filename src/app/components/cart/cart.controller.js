(function () {
  'use strict';

  angular.module('app')
    .controller('CartController', CartController);

  /** @ngInject */
  function CartController(commonService, localStorageService) {
    var vm = this;

    vm.cart;
    vm.products;
    vm.totals;
    vm.cartTotal;

    vm.getProductTotal = getProductTotal;
    vm.changeQty = changeQty;
    vm.removeProduct = removeProduct;

    activate();

    ////////////////////

    function activate() {
      vm.cart = localStorageService.getCart();
      vm.products = [];
      vm.totals = [];
      vm.cartTotal = 0;

      //count number of async call to act when all resolved
      var j = 0;
      for (var i = 0; i < vm.cart.length; i++) {
        commonService.getProduct(vm.cart[i].productId).then(function (response) {
          vm.products.push(response);
          j++;
          if (j == vm.cart.length) {
            calculateTotals();
          }
        })
      }
    }

    function getProductTotal(product, index) {
      return product.price.replace(',', '') * vm.cart[index].quantity;
    }

    /**
     * change quantity for single product
     * @param increase - bool, increase or decrease
     * @param index, product index
       */
    function changeQty(increase, index) {
      if (increase) {
        vm.cart[index].quantity++;
        localStorageService.addToCart(vm.products[index].id, 1);
        vm.cartTotal += parseInt(vm.products[index].price.replace(',', ''));
      }
      else {
        vm.cart[index].quantity--;
        localStorageService.removeFromCart(vm.products[index].id, 1);
        vm.cartTotal -= parseInt(vm.products[index].price.replace(',', ''));
      }
      vm.totals[index] = getProductTotal(vm.products[index], index);

    }

    /**
     * remove product from cart
     * @param id - product id
       */
    function removeProduct(id) {
      localStorageService.removeProductFromCart(id);
      activate();
    }

    /**
       * recalculate total values based on product prices and quantities
     */
    function calculateTotals() {
      vm.totals.length = 0;
      vm.cartTotal = 0;
      for (var i = 0; i < vm.cart.length; i++) {
        vm.totals.push(getProductTotal(vm.products[i], i));
        vm.cartTotal += vm.totals[i];
      }
    }
  }
})();
