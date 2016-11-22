'use strict';

app.controller('LoginCtrl', function($scope, $location, $routeParams, UserFactory, $rootScope) {

	//Message to show for failed login
	$scope.failedLogin = true;
	/////////////////////////////////////////
	$scope.wantedUser = "1111"


	/////////////////////////////////////////
	$scope.login = function() {

		const user = {
			username: $scope.username,
			password: $scope.password
		}
		///////change the ng-show and hide in nav bar///////
	$rootScope.showUserNavLinks();
		///////////////
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



});
