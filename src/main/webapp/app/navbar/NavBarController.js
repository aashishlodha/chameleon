(function(){
	var app = angular.module("chameleon");
	app.controller("NavBarController",['$scope', '$location', 'entityService',
	                                   function($scope, $location, entityService){

		console.log("Inside NavBarController...");

		$scope.projects = null;
		//$scope.selectedProject = null;
	    
	    entityService.getProjectList()
	    .then(function(data){
	    	$scope.projects = data;
	    	return entityService.getSelectedProject();
		})
		.then(function(data){
			console.log("<<selectedProject>> " + data);
	    	$scope.selectedProject = data;
	    });
		
		$scope.projectChange = function(project){
			console.log("Project Selected >> " + project.name);
			entityService.changeProject(project.id).then(function(data){
				$scope.selectedProject = data;
				$location.path("project/" + project.id);
			})
			
		};
	}]);
})();