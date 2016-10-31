"use strict"

app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory, UserFactory, SocketFactory) {
//////setting defualt amount for now///////
  $scope.bidSubmitted = false;
  $scope.lowBid = false;
  $scope.winner = false;

///////will randomly get an item from the database////////
const itemForBid = [];
  const getAllItems = (bid) => {
    AuctionFactory.getItems()
    .then(item => {
      console.log(item);
      item.forEach(function(property) {
        //////////will remove items set to "Not available"/////////
        if (property.available === false) {
          let notAvailable = (item.indexOf(property));
          console.log(item.length);
          // console.log(notAvailable);
            item.splice(notAvailable, 1)
          console.log("length", item.length);
        }
      })

      /////////making logic to generate random item///////////
        let itemLength = item.length
        console.log(itemLength);
        let randomNum = Math.floor(Math.random() * (itemLength));
          $scope.currentItem = (item[randomNum])
          $scope.amount = item[randomNum].currentPrice
        ///////pushes this item to user in the DB//////
        console.log(item[randomNum]);
        ///////push the item data to the database
        itemForBid.push({
          startingPrice: (item[randomNum].startingPrice),
          // finalPrice: (item[randomNum].finalPrice),
          name: (item[randomNum].name)
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
    } else if (bid >= 500 ) { //////setting a $500 max bid
        $scope.amount = bid;
        $scope.winner = true;
        //////logic to remove from db///////
        //////////and then add to users items///////////
        updatePrice(bid)
        moveToWinner(bid);
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
  itemForBid.push({
    finalPrice: bid,
  })
  ////////then get user from Factory///////////////
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
SocketFactory.on('message', function (data) {
$scope.number = data.userNumber;
});



})
