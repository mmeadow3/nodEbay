"use strict"

app.controller("AuctionCtrl", function($scope, ItemFactory, AuctionFactory) {
//////setting defualt amount for now///////
  $scope.bidSubmitted = false;
  $scope.lowBid = false;
///////will randomly get an item from the database////////
  const getAllItems = () => {
    AuctionFactory.getItems()
    .then(item => {
      /////////making logic to generate random item///////////
        let itemLength = item.length
        let randomNum = Math.floor(Math.random() * (itemLength));
        $scope.itemForBid = (item[randomNum])
        $scope.amount = item[randomNum].price
    })
  }
  getAllItems();
////////////////////////////////////
  $scope.submitBid = (bid) => {
    if (bid > $scope.amount){
      $scope.amount = bid;
      $scope.bidSubmitted = true;
    } else {
      $scope.lowBid = true;
    }
    $scope.bid = "";

}



})
