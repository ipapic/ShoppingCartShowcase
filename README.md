Shopping Cart Frontend Showcase App - by Ivan Papic

===================================================
SPA developed using AngularJS 1.x, ES5, HTML5.
App uses mocked static data generated with http://wwww.json-generator.com.
User can browse products by categories and filter by input, sort by product name, price, use paging, or search any product available by partial name or description input.
User can add add products to cart that is stored in local storage and review items, quantities and total prices (change quantites or add/remove items).


Prerequisites:

- Python (>= 2.5.0 < 3.0.0) required by node https://www.python.org/downloads/
  -check if added to path, run 'python --version' from cmd
- NodeJS https://nodejs.org/en/download/
  -check if added to path, run 'node -v' and 'npm -v'

Project setup:

- Navigate to project root from cmd/terminal and run

      npm install

 ...to install node modules.


- Then run

     npm run bower install

 ...to install bower packages.

- Then you should be able to build and serve dev version, run

    npm run serve

 ...to run gulp serve task. App should now be available at localhost. Other gulp tasks are available.
