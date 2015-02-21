(function(){
	var app = angular.module("chameleon");
	app.controller("NavBarController",['$scope', '$rootScope', '$location', 'entityService',
	                                   function($scope, $rootScope, $location, entityService){

		console.log("inside NavBarController...");
		
		$scope.projectChange = function(project){
			console.log("Project Selected >> " + project.name);
			$rootScope.selectedProject = project;
			entityService.getEntitiesForProject(project.id, function(data){
				$rootScope.entities = data;
				$rootScope.entity = null;
				$location.path("/project/" + project.id);
			});
		};
	}]);
})();