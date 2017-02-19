//data service, pass calls to provider set at service activation

(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('dataService', dataService);


  /** @ngInject */
  function dataService(mockedDataProvider) {
    var dataProvider,
      service = {
        list: list,
        get: get
      };

    activate();

    return service;

    ////////////////////////////////

    function activate() {
      dataProvider = mockedDataProvider;
    }

    /**
     * provider method should retrieve resources filtered and sorted by query
     * @param resourceId
     * @param query
     * @param parent
     * @returns {*}
     */
    function list(resourceId, query, parent) {
      return dataProvider.list(resourceId, query, parent);
    }

    /**
     * provider method should retrieve filtered resource
     * @param resourceId
     * @param query
     * @returns {*}
     */
    function get(resourceId, query) {
      return dataProvider.get(resourceId, query);
    }
  }
})();


