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
      })
    })
  }
  getUserData()
})


//
// app.controller("AllItemsCtrl", function($scope, ItemFactory) {
//   $scope.itemsForSale = [];
//   const getAllItems = () => {
//     ItemFactory.getItems()
//     .then(items => {
//       items.forEach((item) => {
//         if (item.available === true) {
//         $scope.itemsForSale.push({name: item.name, price: item.price, available: "For Sale"})
//       } else {
//         $scope.itemsForSale.push({name: item.name, price: item.price, available: "Sold"})
//       }
//       })
//     })
//   }
//   getAllItems();
// })
