(function(){
	var app = angular.module("chameleon");
	app.factory('entityService',['$http','$q',function($http,$q){
		
		return {
			getProjectList : function(callback1, callback2){
				return $http.get("api/project").success(callback1).error(callback2);
			},
			getEntity : function(pid, eid, callback1, callback2){
				return $http.get("api/project/" + pid + "/entity/" + eid).success(callback1).error(callback2);
			},
			getEntitiesForProject : function(pid,callback1,callback2){
				return $http.get("api/project/"+pid+"/entity").success(callback1).error(callback2);
			},
			createOrUpdateEntity : function(pid, entity, callback1, callback2){
				return $http.post("api/project/"+ pid + "/entity", entity).success(callback1).error(callback2);
			},
			deleteEntity : function(pid, eid, callback1, callback2){
				return $http.delete("api/project/"+ pid + "/entity/" + eid).success(callback1).error(callback2);
			}
		}
	}]);
})();