"use strict";

app.factory('ItemFactory', function($http, $q) {

////getting items back from API
  const getItems = () => {
    return $q((resolve, reject) => {
      $http
        .get('/api/items')
        .then(({data}) => {
          if (data) {
            resolve(data)
          } else {
            reject(null);
          }
        })
    })
  }
return {getItems}
})
