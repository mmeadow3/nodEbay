'use strict';

app.controller('LoginCtrl', function($scope, $rootScope, $http, $location, $routeParams, UserFactory) {

	//Message to show for failed login
	$scope.failedLogin = true;
	/////////////////////////////////////////


	/////////////////////////////////////////
	//User login functionality
	$scope.login = () => {

		const user = {
			username: $scope.username,
			password: $scope.password
		}

		//Call to server for user verification
		UserFactory.login(user)
		 .then(data => {
			 	//If user exists sign them in
			 	if (data.data.user) {
					$location.path('/');
				} else {
					$scope.username = "";
					$scope.password = "";
					$scope.failedLogin = false;
				}
		 })
		.catch(console.error);
	}
	/////////////////////////////////////////

});
