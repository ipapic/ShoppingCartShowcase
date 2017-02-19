/**
 * mocked data factory
 */
(function () {
	'use strict';

	angular
		.module('app.data')
		.factory('mockedModel', mockedModel);

  /** @ngInject */
	function mockedModel(mockedProducts, mockedCategories) {
		return {
			products: mockedProducts,
			categories: mockedCategories
		};
	}
}());

