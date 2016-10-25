"use strict";

'use strict';

app.factory('UserFactory', function($http, $q) {

  /////////////////////////////////////////
  //Save current user
  const getCurrentUser = () => {
    return $q((resolve, reject) => {
      $http
        .get('/currentUser')
        .then(({data}) => {
          if (data) {
            resolve(data);
          } else {
            reject(null);
          }
        })
    })//End promise
  }
  /////////////////////////////////////////

  /////////////////////////////////////////
  //Get all users from the db
  const loadUserList = function(currentUsername) {

    return $q((resolve, reject) => {
      $http.get('api/users')
      .then((list) => {
        if (list) {

          let userListMinusCurrentUser = list.data.filter((user) => {
            if (user.username !== currentUsername) {
              return user;
            }
          })

          resolve(userListMinusCurrentUser);
        } else {
          reject(null);
        }
      })
      .catch(console.error);
    });

  };
  /////////////////////////////////////////
  // Call to server to verify user in db
  const login = (user) => {
    return $q((resolve, reject) => {
      $http.post('/login', user)
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(console.error);
        }
      })
    })//End promise
  };//End login()

  /////////////////////////////////////////
  return { loadUserList, getCurrentUser, login };

});
