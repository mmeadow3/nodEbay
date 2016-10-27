"use strict"

app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory) {
//////setting defualt amount for now///////
  $scope.bidSubmitted = false;
  $scope.lowBid = false;
  $scope.winner = false;
///////will randomly get an item from the database////////
  const getAllItems = () => {
    AuctionFactory.getItems()
    .then(item => {
      item.forEach(function(property) {
        //////////will remove items set to "Not available"/////////
          if (property.available === false) {
            let notAvailable = (item.indexOf(property));
            item.splice(notAvailable, 1)
          }
      })
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
    if (bid > $scope.amount && bid < 500){
      $scope.amount = bid;
      $scope.bidSubmitted = true;
      updatePrice(bid)
    } else if (bid >= 500 ) { //////setting a $500 max bid
        $scope.amount = bid;
        $scope.winner = true;
        updatePrice(bid)
        //////logic to remove from db///////
    } else {
      $scope.lowBid = true;
    }
    $scope.bid = "";

}
///////update the price of the item in database///////////
const updatePrice = (bid) => {
    $http
      .put(`/api/items/${$scope.itemForBid._id}`, {price: bid})
      .catch(console.error)
}

})
