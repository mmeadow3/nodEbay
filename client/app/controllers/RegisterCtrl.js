"use strict"


app.controller('RegisterCtrl', function($scope, $http, $location) {

	$(document).ready(function() {
		$('select').material_select()
	})

	$scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) {
			alert('our form is amazing');
		}

	};

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
			console.log(data)
			if(data) {
				$location.path('/login')
			} else {
				$location.path('/register')
			}
		})
		.catch(console.error)
	}

})
