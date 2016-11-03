<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" type="image/x-icon" href="/images/1478051254.ico">
      <title>nodE-bay</title>
    <link rel="stylesheet" type="text/css" href="/node_modules/materialize-css/dist/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="node_modules/animate.css/animate.min.css">
    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>

<div ng-app="nodeBay">
		<div ng-include="'partials/navbar.html'"></div>
		<div ng-view></div>
	</div>



    <script src="/node_modules/angular/angular.min.js"></script>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/materialize-css/dist/js/materialize.min.js"></script>
    <script src="/node_modules/angular-route/angular-route.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <!-- main js script -->
    <script src="/app/main.js"></script>
    <!-- factories  -->
    <script src="/app/factories/ItemFactory.js"></script>
    <script src="/app/factories/UserFactory.js"></script>
    <script src="/app/factories/AuctionFactory.js"></script>
    <script src="/app/factories/SocketFactory.js"></script>
    <!-- controllers -->
    <script src="/app/controllers/AuctionCtrl.js"></script>
    <script src="/app/controllers/UserPage.js"></script>
    <script src="/app/controllers/NavCtrl.js"></script>
    <script src="/app/controllers/RegisterCtrl.js"></script>
    <script src="/app/controllers/LoginCtrl.js"></script>
    <script src="/app/controllers/LogoutCtrl.js"></script>
    <script src="/app/controllers/AllItemsCtrl.js"></script>
</body>

</html>
