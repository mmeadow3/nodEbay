'use strict';

app.controller('NavCtrl', function($scope) {
  $scope.items = [
      {name: "Current Auction", url: "/auction"},
      {name: "My Page", url: "/userPage"},
      {name: "Register", url: "/register"},
      {name: "Login", url: "/login"},
      {name: "Logout", url: "/logout"},
      {name: "Items", url: "/allItems"}
  ];
})
