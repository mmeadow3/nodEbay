"use strict"

app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory, UserFactory, SocketFactory) {
//////setting defualt amount for now///////
  $scope.bidSubmitted = false;
  $scope.lowBid = false;
  $scope.winner = false;
  $scope.winnerTime = false;

///////will get an item from the database////////
const itemsForBid = [];
const getAllItems = (bid) => {
  return AuctionFactory.getItems()
  .then(items => {
    items.forEach(function(item) {
      //////////will remove items set to "Not available"/////////
      if (item.available === true) {
        itemsForBid.push(item)
        items.filter((item => item.available))
      }
    })
    $scope.currentItem = itemsForBid[0]
    $scope.amount = itemsForBid[0].currentPrice
  })
}
getAllItems();
/////////////bidding logic ///////////////////////
  $scope.submitBid = () => {
    var bid = $scope.bid
    if (bid > $scope.amount && bid < 500){
      // $scope.amount = bid;
      $scope.bidSubmitted = true;
      updatePrice(bid)
      sendData(bid)
      getBidData(bid)
    } else if (bid >= 500) { //////setting a $500 max bid
        // $scope.amount = bid;
        $scope.winner = true;
        //////logic to remove from db///////
        //////////and then add to users items///////////

        moveToWinner(bid).then(() => {
          itemsForBid.shift();
          $scope.currentItem = itemsForBid[0];
          $scope.amount = itemsForBid[0].currentPrice;
          console.log(itemsForBid[0].currentPrice);
        })
      } else {
      $scope.lowBid = true;
    }
    $scope.bid = "";
}


///////update the price of the item in database///////////
const updatePrice = (bid) => {
    $http
      .put(`/api/items/${$scope.currentItem._id}`, {currentPrice: bid})
      .catch(console.error)
}
////////// logic to move won item to user page////////
let currentUser = [];
const moveToWinner = (bid) => {
  //////////first assign the winning price to the item////////
  ////////then get user from Factory///////////////
  itemsForBid[0].finalPrice = bid
  return UserFactory.getCurrentUser()
  .then(user => {
    $scope.user = user.username
    ///////get item._id for item being bid on////////
        $http
          .put(`/api/users/${user._id}`, {itemsWon: itemsForBid[0]})
          .catch(console.error)
    // update the final price to see what the user paid
    $http
      .put(`/api/items/${$scope.currentItem._id}`, {finalPrice: bid, currentPrice: bid, available: false})
      .catch(console.error)
  })
}

////////////////////////////
SocketFactory.on('user', function (data) {
  $scope.number = data.userNumber;
});
///////sending data back to server//////////
const sendData = (bid) => {
  SocketFactory.emit("bid", bid)
}

const getBidData = (bid) => {
  SocketFactory.on("bid", (data) => {
    $scope.currentBid = data
  })
}
SocketFactory.on('timer', function (data, bid) {
  if (data.countdown > 0) {
    $scope.time = data.countdown;
      } else {
        $scope.time = "Item has ended"
        $scope.amount = bid;
        $scope.winnerTime = true;
        moveToWinner(bid);
      }
    });
})
