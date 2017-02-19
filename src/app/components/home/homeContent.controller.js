(function () {
  'use strict';

  angular.module('app')
    .controller('HomeContentController', HomeContentController);

  /** @ngInject */
  function HomeContentController(commonService) {
    var vm = this;

    vm.featuredProducts = [];
    vm.featuredProductsSlides = [];
    vm.latestProducts = [];
    vm.latestProductsSlides = [];

    activate();

    ////////////////////

    function activate() {

      var page = {pageNumber: 1, pageSize: 9};

      //get featured products
      commonService.getProducts(page, getFeaturedFilter()).then(function (response) {
        vm.featuredProducts = response.data;
        for (var i = 0; i < vm.featuredProducts.length; i = i + 3) {
          vm.featuredProductsSlides.push(vm.featuredProducts.slice(i, i + 3))
        }
      });

      //get latest products
      commonService.getProducts(page, null, getLatestSort()).then(function (response) {
        vm.latestProducts = response.data;
        for (var i = 0; i < vm.latestProducts.length; i = i + 3) {
          vm.latestProductsSlides.push(vm.latestProducts.slice(i, i + 3))
        }
      })

    }

    /**
     * prepare filter object for api query
     * @returns {{comparator: boolean, expression: string/object}}
     */
    function getFeaturedFilter() {
      var filter = {comparator: false};
      filter.expression = {featured: true};
      return filter;
    }

    /**
     * prepare sort filter for getting latest products
     * @returns {{direction: string, field: string}}
     */
    function getLatestSort() {
      var sort = {direction: 'desc', field: 'created_on'};

      return sort;
    }
  }
})();
