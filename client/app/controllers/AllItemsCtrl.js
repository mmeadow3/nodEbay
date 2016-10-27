"use strict"

app.controller("AllItemsCtrl", function($scope, ItemFactory) {
  $scope.itemsForSale = [];
  const getAllItems = () => {
    ItemFactory.getItems()
    .then(items => {
      items.forEach((item) => {
        if (item.available === true) {
        $scope.itemsForSale.push({name: item.name, price: item.price, available: "For Sale"})
      } else {
        $scope.itemsForSale.push({name: item.name, price: item.price, available: "Sold"})
      }
      })
    })
  }
  getAllItems();
})
