'use strict';

app.controller('LoginCtrl', function($scope, $location, $routeParams, UserFactory, SocketFactory) {

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
					console.log(data.data.user);
					$location.path('/userPage');
				//If user does not exist
				//Reset form and show error message
				} else {
					$scope.username = "";
					$scope.password = "";
					$scope.failedLogin = false;  //////controls the html files
				}
		 })
		.catch(console.error);
	}
	////////////////////////////
	SocketFactory.connect()

});
