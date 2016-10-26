"use strict"

app.controller("AllItemsCtrl", function($scope, ItemFactory) {
  $scope.itemsForSale = [];
  const getAllItems = () => {
    ItemFactory.getItems()
    .then(items => {
      items.forEach((item) => {
        $scope.itemsForSale.push({name: item.name, price: item.price})
      })
    })
  }
  getAllItems();
})
