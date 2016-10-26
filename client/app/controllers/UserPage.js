"use strict"

app.controller("UserPage", function($scope, UserFactory) {
  let currentUser = [];
  const getUserData = () => {
    UserFactory.getCurrentUser()
    .then(user => {
      $scope.user = user
    })
  }
  getUserData()
})
