"use strict"


app.controller('RegisterCtrl', function($scope, $http, $location) {

	$(document).ready(function() {
		$('select').material_select()
	})

	$scope.register = () => {
	const user = {
		username: $scope.username,
		email: $scope.email,
		password: $scope.password
	}

	console.log(user)

	$http
		.post('/register', user)
		.then((data) => {
			if(data) {
				$location.path('/login')
			} else {
				$location.path('/register')
			}
		})
		.catch(console.error)
	}

})
