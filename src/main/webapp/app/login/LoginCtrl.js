(function(){
	var app = angular.module("chameleon");
	app.controller("LoginCtrl",function($scope,$location){
		console.log("LoginCtrl");
		$scope.credentials = {
				username : "",
				password : ""
		};
		
		$scope.login = function(){
			console.log(""+ $scope.credentials.username + $scope.credentials.password);
			if($scope.credentials.username === "Aashish" && $scope.credentials.password === "zzz" ){
				$location.path("/");
			}
			else{
				$location.path("/login");
			}
		}
		
	});
})();