// local storage related logic
(function () {
  'use strict';

  angular
    .module('app')
    .factory('localStorageService', localStorageService);


  /** @ngInject */
  function localStorageService($filter) {
    var service = {
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      removeProductFromCart: removeProductFromCart,
      getCart: getCart,
      setCart: setCart,
      cart: []
    };

    getCart();

    return service;

    ////////////////////////////////

    /**
     * add product items to cart local storage
     * @param productId: int
     * @param qty: int - quantity
     */
    function addToCart(productId, qty) {
      var cart = getCart();
      var existingItems = $filter('filter')(cart, {productId: productId});

      if (existingItems && existingItems[0]) {
        existingItems[0].quantity += qty;
      }
      else {
        cart.push({productId: productId, quantity: qty})
      }

      setCart(cart);
    }

    /**
     * remove product items from cart local storage
     * @param productId: int
     * @param qty: int - quantity
     */
    function removeFromCart(productId, qty) {
      var cart = getCart();
      var existingItems = $filter('filter')(cart, {productId: productId});

      if (existingItems && existingItems[0]) {
        existingItems[0].quantity -= qty;
      }
      else {
        return;
      }

      setCart(cart);
    }

    /**
     * remove all product items from cart
     * @param productId: int
     */
    function removeProductFromCart(productId) {
      var cart = getCart();
      var existingItems = $filter('filter')(cart, {productId: productId});

      if (existingItems && existingItems[0]) {
        cart.splice(cart.indexOf(existingItems[0]), 1);
      }

      else {
        return;
      }

      setCart(cart);
    }

    /**
     * get cart from local storage
     * @returns Array: {quantity: int, productId: int} - array of productId, number of items pairs
     */
    function getCart() {
      var cart;
      try {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
        //fix cart if broken
      catch (ex) {
        cart = [];
        setCart(cart)
      }

      //initialize cart if empty
      if (!cart) {
        cart = [];
        setCart(cart)
      }
      else {
        service.cart = cart;
      }

      return cart;
    }

    function setCart(cart) {
      service.cart = cart;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
})();


