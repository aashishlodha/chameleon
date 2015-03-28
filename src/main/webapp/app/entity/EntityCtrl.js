(function(){
	var app = angular.module("chameleon");
	app.controller("EntityCtrl",['$scope', '$location', '$routeParams', 'entityService',
		function($scope, $location, $routeParams, entityService){
		console.log("Inside EntityCtrl...");

		$scope.entity = null;
		$scope.projects = null;
		$scope.selectedProject = null;
		$scope.entities = null;

		entityService.getProjectList()
		.then(function(projectList){

			$scope.projects = projectList;

			if(!$routeParams.pid){
				$scope.selectedProject = projectList[0];
			}
			else{
				console.log("Setting selected project to $routeParams.pid >>" + $routeParams.pid)
				$scope.selectedProject = entityService.getProjectById($routeParams.pid);
				console.log("selectedProject >> " + $scope.selectedProject);
			}

			entityService.setSelectedProject($scope.selectedProject);

			return entityService.getEntitiesForProject();
		})
		.then(function(entityList){
			// console.log("Entities :" + entityList.length + ", " + $scope.entities.length);
			$scope.entities = entityList;
		});
		
		$scope.selectEntity = function(entity){
			console.log("selected entity : " + JSON.stringify(entity));
			//$scope.entity = entity;
			$location.path("project/"+ entity.pid + "/entity/"+entity.id);
		};
		
		$scope.addNewEntity = function(){
			var newEntity = {
					id:0,
					name: $scope.entityName,
					pid: $scope.selectedProject.id,
					properties:[]
			};
			//console.log("adding new entity... >> " + entity);
			
			entityService.createOrUpdateEntity(newEntity.pid, newEntity)
			.then(function(data){
				console.log("Successfully added a new entity..");
				$scope.entityName = "";
				return entityService.getEntitiesForProject(data.id);
				
				},function(){console.log("Error occurred while getting entity list..");}
			).then(function(data){
					$scope.entities = data;
					$scope.entity = null;
					$location.path("project/"+ newEntity.pid + "/entity/"+data.id);
				},
				function(){console.log("Error occurred while getting entity list..");
			});
			
		};

		$scope.projectChange = function(project){
			console.log("Project Selected >> " + project.name);
			entityService.changeProject(project.id).then(function(data){
				$scope.selectedProject = data;
				$location.path("project/" + project.id);
			})
			
		};
		if($routeParams.eid){
			entityService.getEntity($routeParams.pid,$routeParams.eid).then(function(data){
				console.log("entity fetched >> " + data);
				$scope.entity = data;
			});
		}
		
		$scope.removeProperty = function(index){
			console.log("Removing property >> "+ scope.entity.properties[index].name);
			var length = $scope.entity.properties.splice(index,1);
			//console.log("properties remaining = "+ length);
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
			
			entityService.deleteEntity($routeParams.pid, eid)
			.then(function(){
				console.log("Entity has been removed succesfully..");
				
				entityService.getEntitiesForProject($routeParams.pid, function(data){
					$rootScope.entities = data;
					$rootScope.entity = null;
				},function(){console.log("Error occurred while getting enities list for an project...");});
			},function(){console.log("Error occurred while deleting the entity...");});
			$location.path('/project/'+ $routeParams.pid).replace();
		};
		
		$scope.saveEntity = function(entity){
			entityService.createOrUpdateEntity($routeParams.pid,entity)
			.then(function(){console.log("successfully updated the entity");},
				function(){console.log("there was an error in updating entity");});
		}
		
	}]);
})();