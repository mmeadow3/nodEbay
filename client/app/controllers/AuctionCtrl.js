"use strict"

app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory, UserFactory, SocketFactory) {
//////setting defualt amount for now///////
  $scope.bidSubmitted = false;
  $scope.lowBid = false;
  $scope.winner = false;
  $scope.winnerTime = false;

///////will randomly get an item from the database////////
const itemForBid = [];
  const getAllItems = (bid) => {
    AuctionFactory.getItems()
    .then(item => {
      console.log(item);
      item.forEach(function(property) {
        //////////will remove items set to "Not available"/////////
        if (property.available == false) {
          let notAvailable = (item.indexOf(property));
          console.log(notAvailable);
          console.log(item.length);
            item.splice(notAvailable, 1)
          console.log("length", item.length);
          } else {
          itemForBid.push({
            startingPrice: (item[0].startingPrice),
            currentPrice: (item[0].currentPrice),
            _id: (item[0]._id),
            name: (item[0].name)
          })
          $scope.currentItem = itemForBid[0]
          $scope.amount = itemForBid[0].currentPrice
          console.log(itemForBid[0]);
          }
        })
      })
    }
  getAllItems();
/////////////bidding logic ///////////////////////
  $scope.submitBid = (bid) => {
    if (bid > $scope.amount && bid < 500){
      $scope.amount = bid;
      $scope.bidSubmitted = true;
      updatePrice(bid)
      sendData(bid)
      getBidData(bid)
    } else if (bid >= 500) { //////setting a $500 max bid
        $scope.amount = bid;
        $scope.winner = true;
        //////logic to remove from db///////
        //////////and then add to users items///////////
        moveToWinner(bid);
        updatePrice(bid)
        console.log(itemForBid[0]);
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
  itemForBid[0].finalPrice = bid
  UserFactory.getCurrentUser()
  .then(user => {
    $scope.user = user.username
    ///////get item._id for item being bid on////////
      itemForBid.forEach((nameAndPrice) => {
        $http
          .put(`/api/users/${user._id}`, {itemsWon: nameAndPrice})
          .catch(console.error)
    })
    // update the final price to see what the user paid
    $http
      .put(`/api/items/${$scope.currentItem._id}`, {finalPrice: bid, available: false})
      .catch(console.error)
  })
} ////////need to break out username from this function

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
        updatePrice(bid)
        moveToWinner(bid);
      }
    });
})
