"use strict"

app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory, UserFactory, SocketFactory) {
//////setting defualt amount for now//////
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
    getBidData()
    timerWin()
  })
}
getAllItems();
/////////////bidding logic ///////////////////////
  $scope.submitBid = () => {
    var bid = $scope.bid
    if (bid > $scope.amount && bid < 500){
      sendData(bid)
      getBidData(bid)
      updatePrice(bid) /////update the database
    } else if (bid >= 500) { //////setting a $500 max bid///
        $scope.winner = true;
        sendData(bid)
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
  itemsForBid[0].finalPrice = bid
  itemsForBid[0].available = false
    //////////first assign the winning price to the item////////
  ////////then get user from Factory///////////////
    return UserFactory.getCurrentUser()
      .then(user => {
        // console.log("inside stuff", itemsForBid[0]);
        $scope.user = user.username
        console.log(itemsForBid[0]);
    ///////get item._id for item being bid on////////
      $http
        .put(`/api/users/${user._id}`, {itemsWon: itemsForBid[0]})
        .catch(console.error)
    // update the final price to see what the user paid
      $http
        .put(`/api/items/${$scope.currentItem._id}`, {finalPrice: bid, currentPrice: bid, available: false})
        .catch(console.error)
      })
      console.log("working");
    }

////////////socket logic///////////////
SocketFactory.on('user', function (data) {
  $scope.number = data.userNumber;
});
///////sending data back to server//////////
const sendData = (bid) => {
  SocketFactory.emit("bid", bid)
}

const getBidData = (bid) => {
  SocketFactory.on("bid", (data) => {
    $scope.amount = data.bid
    if (data.bid > 499) {
      moveToWinner(data.bid)
        .then(() => {
          itemsForBid.shift();
          $scope.amount = itemsForBid[0].currentPrice;
          $scope.currentItem = itemsForBid[0];
        })
      }
    })
  }
const timerWin = (bid) => {
SocketFactory.on('timer', function (data) {
  if (data.countdown > 0) {
    $scope.time = data.countdown;
  } else if (data.countdown === 0){
        $scope.winnerTime = true;
        $scope.currentItem._id = itemsForBid[0]._id
        // itemsForBid[0].finalPrice = data.bid
        // itemsForBid[0].available = false
          moveToWinner(data.bid)
          .then(() => {
            SocketFactory.emit("time", 30)
            itemsForBid.shift();
            $scope.amount = itemsForBid[0].currentPrice;
            $scope.currentItem = itemsForBid[0];
          })
        }
    })
  }
})
