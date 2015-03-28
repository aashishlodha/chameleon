(function(){
	var app = angular.module("chameleon");
	app.controller("ExplorerCtrl",['$routeParams','$scope','$location','entityService',
	                                 function($routeParams,$scope,$location,entityService){
		
		console.log("Instantiating ExplorerCtrl..");
		console.log("$routeParams.pid >> " + $routeParams.pid);

		
	}]);
})();