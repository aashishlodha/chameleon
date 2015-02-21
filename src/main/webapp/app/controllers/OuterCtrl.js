(function(){
	var app = angular.module("chameleon");
	app.controller("OuterCtrl",['$scope','$http','$location',function($scope,h,$location){
		$scope.entity;
		//TODO move this to navBarCtrl
		/*$scope.entities;
		h.get("app/data/entities.json").success(function(data){
			$scope.entities = data;
		});*/
		
		//TODO move this to entityViewCtrl
		
	}]);
})();