(function () {
  'use strict';

  angular.module('app')
    .controller('GlobalResultsController', GlobalResultsController);

  /** @ngInject */
  function GlobalResultsController($stateParams, commonService) {
    var vm = this;

    vm.products;
    vm.pagingData = {pageSize: 10, pageNumber: 1};
    vm.filterData = {};

    vm.searchInput = $stateParams.searchInput;

    vm.onPageChange = onPageChange;

    activate();

    ////////////////////

    function activate() {
      loadProducts();
    }

    function onPageChange() {
      loadProducts()
    }

    /**
     * load products
     */
    function loadProducts() {
      commonService.getProducts(vm.pagingData, getFilter(), null, vm.currentCategory).then(function (response) {
        vm.products = response.data;
        vm.pagingData = response.meta;
      })
    }

    /**
     * prepare filter object for api query
     * @returns {{comparator: boolean, expression: string/object}}
     */
    function getFilter() {
      var filter = {comparator: false};
      filter.expression = vm.searchInput ? {
        $: vm.searchInput,
        category_id: '!' + vm.searchInput,
        id: '!' + vm.searchInput
      } : null;
      return filter;
    }
  }
})();
