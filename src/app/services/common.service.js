//service for common logic
(function () {
  'use strict';

  angular
    .module('app')
    .factory('commonService', commonService);


  /** @ngInject */
  function commonService($uibModal, dataService) {
    var service = {
      openProductModal: openProductModal,
      getProducts: getProducts,
      getCategories: getCategories,
      getProduct: getProduct
    };

    return service;

    ////////////////////////////////

    /**
     * open detailed product view
     * @param product
     */
    function openProductModal(product) {
      var modalOptions = {
        controller: 'ProductController',
        controllerAs: 'vm',
        templateUrl: 'app/components/product/product.html',
        size: 'lg',
        resolve: {
          product: function () {
            return product;
          }
        }

      };

      $uibModal.open(modalOptions).result.then(function () {
      }, function () {
      });
    }

    function getProducts(page, filter, sort, categoryId) {
      var query,
        _filter = filter || {
            comparator: false
          },

        _sort = {
          direction: sort && sort['direction'] || 'asc',
          field: sort && sort['field'] || 'id'
        },

        _page = {
          number: page && page.pageNumber || 0,
          size: page && page.pageSize || 50
        },

        _fields = '',
        _parent = {resourceId: 'category', itemId: categoryId};

      query = {
        filter: _filter, sort: _sort, page: _page, fields: _fields
      };

      return dataService.list('products', query, _parent)
    }

    function getProduct(id) {
      return dataService.get('products', {filter: {id: id}})

    }

    function getCategories() {
      var query,
        filter = {},

        sort = {
          direction: 'asc',
          field: 'name'
        },

        page = {},

        fields = 'id, name';

      query = {
        filter: filter, sort: sort, page: page, fields: fields
      };

      return dataService.list('categories', query)
    }
  }
})();


