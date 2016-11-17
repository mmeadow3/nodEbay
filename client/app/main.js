'use strict';

const app = angular
	.module('nodeBay', ['ngRoute'])
	.config(($routeProvider, $locationProvider) => {
		$routeProvider
		.when('/register', {
			controller: 'RegisterCtrl',
			templateUrl: 'partials/register.html'
		})
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: 'partials/login.html'
		})
		.when('/allItems', {
			controller: 'AllItemsCtrl',
			templateUrl: 'partials/allItems.html'
		})
		.when('/auction', {
				controller: 'AuctionCtrl',
				templateUrl: 'partials/auction.html'
		})
		.when('/userPage', {
				controller: 'UserPage',
				templateUrl: 'partials/userPage.html'
			})
		.when('/logout', {
					controller: 'LogoutCtrl',
					templateUrl: 'partials/logout.html'
		})
		.when('/*', {
				controller: 'NavCtrl',
				templateUrl: 'partials/navbar.html'
		})
		.otherwise('/register')


			//Cleans up the url, does not use '!#' in url
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	})
