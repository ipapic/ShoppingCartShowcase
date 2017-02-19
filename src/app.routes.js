/**
 * route config
 */
angular
  .module('app')
  .config(routesConfig).run(function () {
});

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/browse/home');

  /**
   * header is common for every app substate
   */
  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      views: {
        'header@': {
          templateUrl: 'app/components/header/header.html',
          controller: 'HeaderController',
          controllerAs: 'vm'
        }
      }
    })
    /**
     * left sidebar is common for every product browsing state
     */
    .state('app.browse', {
      url: '/browse',
      abstract: true,
      views: {
        'main-content@': {
          templateUrl: 'app/layouts/browseLayout.html'
        },
        'left-sidebar@app.browse': {
          templateUrl: 'app/components/home/homeSidebar.html',
          controller: 'HomeSidebarController',
          controllerAs: 'vm'
        }
      }
    })
    .state('app.browse.home', {
      url: '/home',
      views: {
        'content@app.browse': {
          templateUrl: 'app/components/home/homeContent.html',
          controller: 'HomeContentController',
          controllerAs: 'vm'
        }
      }
    })
    /**
     * most complex state with filtering single category products
     */
    .state('app.browse.category', {
        url: '/category/:categoryId',
        views: {
          'content@app.browse': {
            templateUrl: 'app/components/category/categoryContent.html',
            controller: 'CategoryContentController',
            controllerAs: 'vm'
          }
        },
        onEnter: ['$rootScope', '$stateParams', '$timeout', function ($rootScope, $stateParams, $timeout) {
          $timeout(function () {
              $rootScope.$broadcast('categoryChanged', {id: $stateParams.categoryId})
            }
          )
        }],
        onExit: ['$rootScope', '$stateParams', '$timeout', function ($rootScope, $stateParams, $timeout) {
          $timeout(function () {
              $rootScope.$broadcast('categoryChanged', {id: null})
            }
          )
        }]
      }
    )
    /**
     * search any product by its name or description
     */
    .state('app.browse.global', {
        url: '/results/:searchInput',
        views: {
          'content@app.browse': {
            templateUrl: 'app/components/globalResults/globalResultsContent.html',
            controller: 'GlobalResultsController',
            controllerAs: 'vm'
          }
        }
      }
    )
    .state('app.cart', {
      url: '/cart',
      views: {
        'main-content@': {
          templateUrl: 'app/components/cart/cartContent.html',
          controller: 'CartController',
          controllerAs: 'vm'
        }
      }
    })
}
