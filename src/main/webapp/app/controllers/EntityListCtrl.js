(function(){
	var app = angular.module("chameleon");
	app.controller("EntityListCtrl",['$scope','$rootScope','$location','entityService',
	                                 function($scope,$rootScope,$location,entityService){
		
		$scope.gridOptions = { 
			data: 'entities'
			//showFooter: true,
			,multiSelect: false
			,enableCellSelection: false
        	,enableRowSelection: true
        	,enableCellEdit: true
			,columnDefs: [
				{field:'name', displayName:'Entities', 
				//headerCellTemplate:'<span style=\'float:left;margin:4px;\'>Entities</span><span ng-click="alert(1)" class="glyphicon glyphicon-plus" style=\'float:right;margin:4px;\'></span>', 
				enableCellEdit: true}
				/*,{displayName:'Delete', enableCellEdit: false, cellTemplate: '<a ng-click=\'alert(1);\'>Delete</a>'}*/
			]
			//,rowTemplate: '<div ng-click=\'alert(1)\' ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>'
		};

		$scope.selectEntity = function(entity){
			console.log("selected entity : " + JSON.stringify(entity));
			//$scope.entity = entity;
			$location.path("project/"+ entity.pid + "/entity/"+entity.id);
		};
		
		$scope.addNewEntity = function(){
			var newEntity = {
					id:0,
					name: $scope.entityName,
					pid: $rootScope.selectedProject.id,
					properties:[]
			};
			console.log("adding new entity... >> " + entity);
			
			entityService.createOrUpdateEntity(newEntity.pid, newEntity, function(data){
				console.log("Successfully added a new entity..");
				$scope.entityName = "";
				entityService.getEntitiesForProject(newEntity.pid,function(data){
					$rootScope.entities = data;
					$rootScope.entity = null;
				},function(){console.log("Error occurred while getting entity list..");});
				$location.path("project/"+ newEntity.pid + "/entity/"+data.id);
			},function(){console.log("Error occurred while getting entity list..");});
			
		}
	}]);
})();