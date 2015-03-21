(function(){
	var app = angular.module("chameleon",["ngRoute","ui.grid", "ui.grid.edit", "ui.grid.selection"]);
	app.config(function($routeProvider/*, $locationProvider*/){
		$routeProvider.when("/",{
			templateUrl: "app/entity/entity.html",
			controller : "EntityCtrl"
		});
		$routeProvider.when("/project/:pid",{
			templateUrl: "app/entity/entity.html",
			controller : "EntityCtrl"
		});
		$routeProvider.when("/login",{
			templateUrl: "app/login/login.html",
			controller : "LoginCtrl"
		});
		$routeProvider.when("/project/:pid/entity/:eid",{
			templateUrl: "app/entity/entity.html",
			controller : "EntityCtrl"
		});
		$routeProvider.otherwise({
			redirectTo : "/"
		});

		//$locationProvider.html5Mode(true);
	});
})();