'use strict';

app.controller('NavCtrl', function($scope, $rootScope, UserFactory) {

  $rootScope.noUserSignedIn = false;
  $rootScope.UserSignedIn = true;

  $rootScope.showUserNavLinks = () => {
    $rootScope.noUserSignedIn = true;
    $rootScope.UserSignedIn = false;
  }

  $rootScope.hideUserNavLinks = () => {
    $rootScope.noUserSignedIn = false;
    $rootScope.UserSignedIn = true;
  }
    UserFactory.getCurrentUser()
    .then((user) => {
      if (user) {
        $rootScope.showUserNavLinks();
      } else {
        $rootScope.hideUserNavLinks();
      }
    })

})
