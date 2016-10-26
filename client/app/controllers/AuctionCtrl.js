"use strict"

app.controller("AuctionCtrl", function($scope, $q, $http, ItemFactory, AuctionFactory) {
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
      updatePrice(bid)
    } else {
      $scope.lowBid = true;
    }
    $scope.bid = "";

}

// ///////update the price of the item in database///////////
// const updatePrice = (bid) => {
//   return $q((resolve, reject) => {
//     $http
//       .put(`/api/items/${$scope.itemForBid._id}`, bid)
//       .then(({data}) => {
//         if (data) {
//           console.log(bid);
//           resolve(data)
//         } else {
//           reject(null);
//         }
//       })
//   })
// }
///////update the price of the item in database///////////
const updatePrice = (bid) => {
    $http
      .put(`/api/items/${$scope.itemForBid._id}`, {price: bid})
      .then(() => {
        AuctionFactory.getItems()
      })
      .catch(console.error)
    }




})
