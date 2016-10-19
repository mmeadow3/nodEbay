'use strict';

const app = angular
	.module('nodeBay', ['ngRoute'])
	.config(($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/', {
				controller: 'navCtrl',
				templateUrl: 'partials/navbar.html'
			})
			.otherwise('/')


			//Cleans up the url, does not use '!#' in url
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	})

console.log("this is working");
