// "use strict"
//
// app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory, UserFactory) {
// //////setting defualt amount for now///////
//   $scope.bidSubmitted = false;
//   $scope.lowBid = false;
//   $scope.winner = false;
//
// ///////will randomly get an item from the database////////
//   const getAllItems = () => {
//     AuctionFactory.getItems()
//     .then(item => {
//       item.forEach(function(property) {
//         //////////will remove items set to "Not available"/////////
//           if (property.available === false) {
//             let notAvailable = (item.indexOf(property));
//             item.splice(notAvailable, 1)
//           }
//       })
//       /////////making logic to generate random item///////////
//         let itemLength = item.length
//         let randomNum = Math.floor(Math.random() * (itemLength));
//         $scope.itemForBid = (item[randomNum])
//         $scope.amount = item[randomNum].price
//     })
//   }
//   getAllItems();
//
// /////////////bidding logic ///////////////////////
//   $scope.submitBid = (bid) => {
//     if (bid > $scope.amount && bid < 500){
//       $scope.amount = bid;
//       $scope.bidSubmitted = true;
//       updatePrice(bid)
//     } else if (bid >= 500 ) { //////setting a $500 max bid
//         $scope.amount = bid;
//         $scope.winner = true;
//         //////logic to remove from db///////
//         updatePrice(bid);
//     } else {
//       $scope.lowBid = true;
//     }
//     $scope.bid = "";
//
// }
// ///////update the price of the item in database///////////
// const updatePrice = (bid) => {
//     $http
//       .put(`/api/items/${$scope.itemForBid._id}`, {price: bid})
//       .catch(console.error)
// }
// ////////// logic to move won item to user page////////
// const moveToWinner = () => {
//   UserFactory.getCurrentUser()
//   .then(user => {
//     $scope.user = user.username
//     console.log(user._id);
//
//   // $http
//   //   .put(`/api/users/${user._id}`, {itemsWon: })
//   //   .catch(console.error)
//   })
// }
//
//
// moveToWinner()
// })




"use strict"

app.controller("AuctionCtrl", function($scope, $http, ItemFactory, AuctionFactory, UserFactory) {
//////setting defualt amount for now///////
  $scope.bidSubmitted = false;
  $scope.lowBid = false;
  $scope.winner = false;

///////will randomly get an item from the database////////
const itemForBid = [];
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
        $scope.currentItem = (item[randomNum])
        $scope.amount = item[randomNum].price
        ///////pushes this item to user in the DB//////
        itemForBid.push({
          price: (item[randomNum].price),
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
        updatePrice(bid);
        //////////and then add to users items///////////
        moveToWinner();
    } else {
      $scope.lowBid = true;
    }
    $scope.bid = "";

}
///////update the price of the item in database///////////
const updatePrice = (bid) => {
    $http
      .put(`/api/items/${$scope.currentItem._id}`, {price: bid})
      .catch(console.error)
}
////////// logic to move won item to user page////////
const moveToWinner = () => {
  UserFactory.getCurrentUser()
  .then(user => {
    $scope.user = user.username
    ///////get item._id for item being bid on////////
      itemForBid.forEach((id) => {
        $http
          .put(`/api/users/${user._id}`, {itemsWon: id})
          .catch(console.error)
    })

  })
}
})
