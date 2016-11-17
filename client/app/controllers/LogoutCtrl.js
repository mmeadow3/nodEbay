"use strict"

app.controller('LogoutCtrl', function($scope, $location, UserFactory, $rootScope) {

  /////////////////////////////////////////
  // Logout functionality
  $scope.logout = () => {
    UserFactory.logout();
    $location.path('/login');
    //When user logs out, hide some navbar links
    $rootScope.hideUserNavLinks = () => {
      $rootScope.noUserSignedIn = false;
      $rootScope.UserSignedIn = true;
    }
    $rootScope.hideUserNavLinks();
	};
  /////////////////////////////////////////


});
