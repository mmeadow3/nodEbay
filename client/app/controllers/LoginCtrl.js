'use strict';

app.controller('LoginCtrl', function($scope) {

	//Message to show for failed login
	$scope.failedLogin = true;

	$scope.login = function() {

		const user = {
			username: $scope.username,
			password: $scope.password
		}
}
});
