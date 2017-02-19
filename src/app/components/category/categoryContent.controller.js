(function () {
  'use strict';

  angular.module('app')
    .controller('CategoryContentController', CategoryContentController);

  /** @ngInject */
  function CategoryContentController($stateParams, commonService) {
    var vm = this;

    vm.products;
    vm.pagingData = {pageSize: 10, pageNumber: 1};
    vm.filterData = {};
    vm.sortOptions = [
      {
        name: 'Sort by name A-Z',
        sort: {
          direction: 'asc',
          field: 'name'
        }
      },
      {
        name: 'Sort by lowest price',
        sort: {
          direction: 'asc',
          field: 'price'
        }
      },
      {
        name: 'Sort by highest price',
        sort: {
          direction: 'desc',
          field: 'price'
        }
      }
    ];
    vm.searchInput = "";
    vm.selectedSortOption = vm.sortOptions[0];
    vm.currentCategory = parseInt($stateParams.categoryId);


    vm.onPageChange = onPageChange;
    vm.onSortChange = onSortChange;
    vm.loadProducts = loadProducts;

    activate();

    ////////////////////

    function activate() {
      loadProducts();


    }

    function onPageChange() {
      loadProducts()
    }

    function onSortChange() {
      loadProducts();
    }

    /**
     * load products
     */
    function loadProducts() {
      commonService.getProducts(vm.pagingData, getFilter(), vm.selectedSortOption.sort, vm.currentCategory).then(function (response) {
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
