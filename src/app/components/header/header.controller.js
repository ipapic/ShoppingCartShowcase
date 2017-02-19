(function () {
  'use strict';

  angular.module('app')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($state, localStorageService) {
    var vm = this;

    vm.searchInput = "";
    vm.localStorageService = localStorageService;

    vm.openHome = openHome;
    vm.search = search;

    activate();

    ////////////////////

    function activate() {
    }

    /**
     * navigate to home state
     */
    function openHome() {
      $state.go('app.browse.home')
    }

    /**
     * navigate to global search state if user inputted anything
     */
    function search() {
      if (vm.searchInput) {
        $state.go('app.browse.global', {searchInput: vm.searchInput})
      }
    }
  }
})();
