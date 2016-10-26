"use strict"

app.controller("AuctionCtrl", function($scope, ItemFactory, AuctionFactory) {
//////setting defualt amount for now///////
  $scope.amount = 1234.56;

///////will randomly get an item from the database////////
  const getAllItems = () => {
    AuctionFactory.getItems()
    .then(item => {
      /////////making logic to generate random item///////////
        let itemLength = item.length
        let randomNum = Math.floor(Math.random() * (itemLength));
        $scope.itemForBid = (item[randomNum])
    })
  }
  getAllItems();
////////////////////////////////////
  $scope.submitBid = (bid) => {
    console.log(bid);
}



})
