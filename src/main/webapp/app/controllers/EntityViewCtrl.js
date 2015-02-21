(function(){
	var app = angular.module("chameleon");
	app.controller("EntityViewCtrl",['$scope', '$rootScope', '$location', '$routeParams', 'entityService',
		function($scope, $rootScope, $location, $routeParams,entityService){
		console.log("inside EntityViewCtrl...");
		if($routeParams.eid == undefined){
			$rootScope.entity = false;
		}
		
		if($routeParams.pid != undefined && $routeParams.eid != undefined){
			console.log("routeParams >> " + $routeParams.pid + "->" + $routeParams.eid);

			entityService.getEntity($routeParams.pid,$routeParams.eid,function(data){
				console.log("entity fetched >> " + data);
				$rootScope.entity = data;
			})
		}

		console.log($rootScope.selectedProject);
		if($rootScope.selectedProject == undefined){
			console.log("Getting Project list....");
			entityService.getProjectList(function(data){
				console.log(data);
				$rootScope.projects = data;
				
				if($routeParams.pid == undefined && $rootScope.projects.length > 0){
					$rootScope.selectedProject = $rootScope.projects[0];
				}else{
					angular.forEach($rootScope.projects, function(project){
						if(project.id == $routeParams.pid){
							$rootScope.selectedProject = project;
						}
					});
				}

				console.log("Fetching entity list..");
				entityService.getEntitiesForProject($rootScope.selectedProject.id, function(data){
					$rootScope.entities = data;
				},function(){console.log("Error occurred while getting enities list for an project...");});
				
			},function(){console.log("Error occurred while getting project list..");});

			/*if($routeParams.pid != undefined){
				console.log("Fetching entity list..");
				entityService.getEntitiesForProject($routeParams.pid, function(data){
					$rootScope.entities = data;
				},function(){console.log("Error occurred while getting enities list for an project...");});
			}*/
		}else if($rootScope.selectedProject.id != $routeParams.pid){
			console.log("Selecting project..");
			angular.forEach($scope.projects, function(project){
				if(project.id == $routeParams.pid){
					$rootScope.selectedProject = project;
					console.log("Fetching entity list..");
					entityService.getEntitiesForProject($rootScope.selectedProject.id, function(data){
						$rootScope.entities = data;
					},function(){console.log("Error occurred while getting enities list for an project...");});
				}

			});
		}

		$scope.removeProperty = function(index){
			var length = $scope.entity.properties.splice(index,1);
			console.log("properties remaining = "+ length);
		};

		$scope.addProperty = function(){
			var property = {
					name : "PropertyName",
					type : "Integer",
					id : $scope.entity.properties.length + 1
			};
			$scope.entity.properties.push(property);
		};

//		$scope.typeList = [{name : "String"},{name : "Integer"},{name : "Float"},{name:"Double"},{name:"Boolean"}];
		$scope.typeList = ["String","Integer","Float","Double", "Boolean", "Date"];
		
		$scope.removeEntity = function(eid){
			
			entityService.deleteEntity($routeParams.pid, eid, function(){
				console.log("Entity has been removed succesfully..");
				
				entityService.getEntitiesForProject($routeParams.pid, function(data){
					$rootScope.entities = data;
					$rootScope.entity = null;
				},function(){console.log("Error occurred while getting enities list for an project...");});
			},function(){console.log("Error occurred while deleting the entity...");});
			$location.path('/project/'+ $routeParams.pid).replace();
		};
		
		$scope.saveEntity = function(entity){
			entityService.createOrUpdateEntity($routeParams.pid,entity,function(){console.log("successfully updated the entity");},
				function(){console.log("there was an error in updating entity");});
		}
		
	}]);
})();