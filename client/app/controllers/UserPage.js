"use strict"

app.controller("UserPage", function($scope, UserFactory) {
  let currentUser = [];
  let itemWon = [];
  const getUserData = () => {
    UserFactory.getCurrentUser()
    .then(user => {
      $scope.user = user
      ///////beaking out each individual item from Array////////////
        user.itemsWon.forEach((item) => {
          itemWon.push(item);
          $scope.itemWon = itemWon;
          console.log(itemWon);
      })
    })
  }
  getUserData()
})
