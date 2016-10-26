"use strict"

app.controller('LogoutCtrl', function($scope, $location, UserFactory) {

  /////////////////////////////////////////
  // Logout functionality
  $scope.logout = () => {
    UserFactory.logout();
    $location.path('/login');
    //When user logs out, hide some navbar links
	};
  /////////////////////////////////////////


});