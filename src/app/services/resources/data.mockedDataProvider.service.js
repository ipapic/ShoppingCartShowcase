/**
 * mocked data provider
 */
(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('mockedDataProvider', MockedDataProvider);

  /** @ngInject */
  function MockedDataProvider($q, $filter, mockedModel) {

    var service = {
      list: list,
      get: get
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param resourceId - name of resource being accessed
     * @param query
     * @param parent
     * @returns promise that resolves array of resources
     */
    function list(resourceId, query, parent) {
      var resources = mockedModel[resourceId],
        def = $q.defer();

      resources = resolveResources(resources, query, parent, '_id', doFilter);

      def.resolve(resources);

      return def.promise;

      /**
       *  slices page from list of resources
       * @param resources
       * @param pageOptions
       * @returns {Array} - of resources
       */
      function getListOfElementsForSpecificPage(resources, pageOptions) {
        var startOfTheList = 0,
          endOfTheList;

        if (pageOptions.number >= 0 && pageOptions.size >= 0) {
          if (pageOptions.number > 1) {
            startOfTheList = pageOptions.size * pageOptions.number - pageOptions.size;
          }
          endOfTheList = startOfTheList + pageOptions.size;
          resources = resources.slice(startOfTheList, endOfTheList);
        }

        return resources;
      }

      /**
       * gets selected fields
       * @param resources
       * @param queryFields
       * @returns {Array} - of resources
       */
      function getSpecificFields(resources, queryFields) {
        var fields = queryFields.split(','),
          newResources = [],
          result;

        fields = fields.map(function (field) {
          return field.trim();
        });

        resources.forEach(function (resource) {
          result = {};
          fields.forEach(function (field) {
            if (resource[field]) {
              result[field] = resource[field];
            }
          });
          newResources.push(result);
        });
        return newResources;
      }

      /**
       * sorts resources
       * @param resources
       * @param sortOptions
       * @returns {Array} - of resources
       */
      function getSortedResources(resources, sortOptions) {
        var sortOrder = sortOptions.direction.toLowerCase().trim(),
          sortFilter = '';

        if (sortOrder === 'desc') {
          sortFilter = '-';
        } else if (sortOrder === 'asc') {
          sortFilter = '+';
        }


        sortFilter += sortOptions.field;

        return $filter('orderBy')(resources, sortFilter);
      }

      /**
       * filters resources
       * @param resources
       * @param query
       * @returns {{resources: Array, result: Array}} - returns initial and filtered resources
       */
      function doFilter(resources, query) {
        var resourcesStates = {
          resources: resources,
          result: resources
        };

        if (resources && resources.length && query) {
          if (query.filter && query.filter.expression) {
            resourcesStates.queryFilter = $filter('filter')(resourcesStates.result, query.filter.expression, query.filter.comparator);
            resourcesStates.result = resourcesStates.queryFilter;
          }
          if (query.sort) {
            resourcesStates.sortFilter = getSortedResources(resourcesStates.result, query.sort);
            resourcesStates.result = resourcesStates.sortFilter;
          }
          if (query.page) {
            resourcesStates.queryPage = getListOfElementsForSpecificPage(resourcesStates.result, query.page);
            resourcesStates.result = resourcesStates.queryPage;
          }
          if (query.fields) {
            resourcesStates.queryFields = getSpecificFields(resourcesStates.result, query.fields);
            resourcesStates.result = resourcesStates.queryFields;
          }
        }

        return resourcesStates;
      }
    }

    /**
     *
     * @param resourceId
     * @param query
     * @returns promise - resolves single resource
     */
    function get(resourceId, query) {
      var resources = mockedModel[resourceId],
        def = $q.defer();

      if (resources && resources.length && query) {
        resources = $filter('filter')(resources, query.filter, true);
        if (resources.length === 1) {
          def.resolve(resources[0]);
        } else {
          def.reject({
            message: 'too many resources or unable to find one'
          });
        }
      } else {
        def.reject({
          message: 'unable to find resource'
        });
      }

      return def.promise;
    }

    function getParentResourceWithChildResources(resources, parent, foreignKeyExtension) {
      var foreignKey = parent.resourceId + foreignKeyExtension,
        resourcesFilter = {},
        resolvedResources;

      resourcesFilter[foreignKey] = parent.itemId;
      resolvedResources = $filter('filter')(resources, resourcesFilter, true);
      return resolvedResources;
    }

    /**
     * @private
     * @param resources
     * @param query
     * @param resolver
     * @returns {{data: Array, meta: null}} - array of resources and filter information
     */
    function resolveResources(resources, query, parent, foreignKeyExtension, resolver) {
      var resolvedResources = {
          data: [],
          meta: null
        },
        resourcesStates,
        metadata;

      if (parent && parent.resourceId && parent.itemId) {
        resourcesStates = getParentResourceWithChildResources(resources, parent, foreignKeyExtension);
        if (resourcesStates.length) {
          resourcesStates = resolver(resourcesStates, query);
        }
      } else if (resources) {
        resourcesStates = resolver(resources, query);
      } else {
        resourcesStates = {
          result: []
        };
      }
      metadata = getMetadata(resourcesStates, query);
      resolvedResources.data = resourcesStates.result || [];
      resolvedResources.meta = metadata;

      return resolvedResources;
    }

    /**
     * @private
     * @param resolvedResources
     * @param query
     * @returns {count: int, totalCount: int, pageNumber: int, pageSize: int}
     */
    function getMetadata(resolvedResources, query) {
      return {
        count: getCount(resolvedResources),
        totalCount: getTotalCount(resolvedResources),
        pageNumber: query && query.page && query.page.number || undefined,
        pageSize: query && query.page && query.page.size || undefined
      };

      /**
       * @private
       * @param resolvedResources
       * @returns int - number of retrived resources
       */
      function getCount(resolvedResources) {
        if (resolvedResources.queryPage) {
          return resolvedResources.queryPage.length;
        } else if (resolvedResources.queryFilter) {
          return resolvedResources.queryFilter.length;
        } else if (resolvedResources.resources) {
          return resolvedResources.resources.length;
        } else {
          return 0;
        }
      }

      /**
       * @private
       * @param resolvedResources
       * @returns int - number of total filtered resources without paging
       */
      function getTotalCount(resolvedResources) {
        if (resolvedResources.queryFilter) {
          return resolvedResources.queryFilter.length;
        } else if (resolvedResources.resources) {
          return resolvedResources.resources.length;
        } else {
          return 0;
        }
      }
    }
  }
}());
