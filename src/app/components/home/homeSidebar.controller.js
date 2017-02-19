(function () {
  'use strict';

  angular.module('app')
    .controller('HomeSidebarController', HomeSidebarController);

  /** @ngInject */
  function HomeSidebarController($scope, commonService, $state) {
    var vm = this;

    vm.categories;
    vm.activeCategory = "";

    vm.browseCategory = browseCategory;

    activate();

    ////////////////////

    function activate() {
      commonService.getCategories().then(function (response) {
        vm.categories = response.data;
      });

      //keep track of active category
      $scope.$on('categoryChanged', function (e, o) {
        setActiveCategory(o.id)
      });

    }

    /**
     * navigate to state responsible for browsing single category products
     * @param id - category id
       */
    function browseCategory(id) {
      $state.go('app.browse.category', {categoryId: id});
    }

    /**
     * sets active category
     * @param id
       */
    function setActiveCategory(id) {
      vm.activeCategory = id;
    }
  }
})();
