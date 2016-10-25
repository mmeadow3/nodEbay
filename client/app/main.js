'use strict';

const app = angular
	.module('nodeBay', ['ngRoute'])
	.config(($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/auction', {
				controller: 'AuctionCtrl',
				templateUrl: 'partials/auction.html'
			})
			.when('/userPage', {
				controller: 'UserPage',
				templateUrl: 'partials/userPage.html'
			})
			.when('/register', {
					controller: 'RegisterCtrl',
					templateUrl: 'partials/register.html'
				})
			.otherwise('/')


			//Cleans up the url, does not use '!#' in url
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	})
