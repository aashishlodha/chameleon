(function(){
	var app = angular.module("chameleon",["ngRoute","ngGrid"]);
	app.config(function($routeProvider){
		$routeProvider.when("/",{
			templateUrl: "app/templates/entityView.html",
			controller : "EntityViewCtrl"
		});
		$routeProvider.when("/project/:pid",{
			templateUrl: "app/templates/entityView.html",
			controller : "EntityViewCtrl"
		});
		$routeProvider.when("/login",{
			templateUrl: "app/templates/login.html",
			controller : "LoginCtrl"
		});
		$routeProvider.when("/project/:pid/entity/:eid",{
			templateUrl: "app/templates/entityView.html",
			controller : "EntityViewCtrl"
		});
		$routeProvider.otherwise({
			redirectTo : "/"
		});
	});
})();