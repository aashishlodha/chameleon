(function(){
	var app = angular.module("chameleon");
	app.controller("EntityCtrl",['$scope', '$location', '$routeParams', 'entityService',
		function($scope, $location, $routeParams, entityService){
		console.log("Inside EntityViewCtrl...");

		$scope.entity = null;
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