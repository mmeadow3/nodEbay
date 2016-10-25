'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, $routeParams, UserFactory) {

	//Message to show for failed login
	$scope.failedLogin = true;
	/////////////////////////////////////////


	/////////////////////////////////////////
	$scope.login = function() {

		const user = {
			username: $scope.username,
			password: $scope.password
		}

		//Call to server for user verification
		UserFactory.login(user)
		 .then(data => {
			 	//If user exists sign them in
			 	if (data.data.user) {
					console.log(data);
					$location.path('/');
					//If login is a success, show full navbar
				//If user does not exist
				//Reset form and show error message
				} else {
					$scope.username = "";
					$scope.password = "";
					$scope.failedLogin = false;
				}
		 })
		.catch(console.error);
	}
	/////
	/////////////////////////////////////////

});
