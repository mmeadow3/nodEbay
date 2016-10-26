"use strict"

app.controller("AllItemsCtrl", function($scope, ItemFactory) {
  $scope.itemsForSale = [];
  const getAllItems = () => {
    ItemFactory.getItems()
    .then(items => {
      items.forEach((item) => {
        console.log(item.name, item.price, item.available)
        $scope.itemsForSale.push({name: item.name, price: item.price})
      })
    })
  }
  getAllItems();
})
