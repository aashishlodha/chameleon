(function(){
	var app = angular.module("chameleon");
	app.factory('entityService',['$http','$q',function($http,$q){

		var projectList = null;
		var selectedProject = null;
		var entityList = null;
		var selectedEntity = null;

		console.log("Creating service object for entityService..");
		var service = {
			changeProject : changeProject,
			getSelectedProject : getSelectedProject,
			getProjectList : getProjectList,
			getEntity : getEntity,
			getEntitiesForProject : getEntitiesForProject,
			createOrUpdateEntity : createOrUpdateEntity,
			deleteEntity : deleteEntity
		};

		return service;

		function changeProject(pid){
			var deferred = $q.defer();

			angular.forEach(projectList, function(project){
				if(project.id == pid){
					selectedProject = project;
				}
			});

			console.log("splicing entity list..");
			entityList.splice(0,entityList.length);
			console.log(entityList);
			
			getEntitiesForProject();
			//entityList.splice(0,entityList.length);
			//console.log("<<entityList>> " + entityList);
			deferred.resolve(selectedProject);
			return deferred.promise;
		};

		function getSelectedProject(){
			var deferred = $q.defer();

			if(selectedProject == null){
				getProjectList()
				.then(function(projects){
					console.log("<<projects>>" + projects);
					selectedProject = projects[0];
				});
				selectedProject = projectList[0];
				deferred.resolve(selectedProject);
			}
			else{
				deferred.resolve(selectedProject);
			}
			return deferred.promise;
		};
		
		function getProjectList(){
			var deferred = $q.defer();

			if(projectList == null){
				console.log("Getting the Project list for the first time..");

				$http.get("api/project")
				.success(function(data){
					projectList = data;
					if(selectedProject == null)
						selectedProject == projectList[0];
					deferred.resolve(data);
				})
				.error(function(reason){
					deferred.reject(reason);
				});
			}
			else{
				console.log("Returning the Project list present in memory..");
				deferred.resolve(projectList);
			}

			return deferred.promise;
		};

		function getEntity(pid, eid){

			var deferred = $q.defer();

			// We should check here that entity is present in the memory or not..
			if(selectedProject.id == pid && selectedEntity != undefined && selectedEntity.id == eid){
				deferred.resolve(selectedEntity);
			}
			else{
				console.log("Getting the Entity for the first time..");
				$http.get("api/project/" + pid + "/entity/" + eid)
				.success(function(data){
					//entityList[eid] = data;
					selectedEntity = data;
					deferred.resolve(data);
				})
				.error(function(reason){
					deferred.reject(reason);
				});
			}
			return deferred.promise;
		};

		function getEntitiesForProject(){
			var deferred = $q.defer();
			var pid;
			getSelectedProject().then(function(project){
				console.log("<<project>>" + project);
				pid = project.id;
				$http.get("api/project/"+pid+"/entity")
					.success(function(data){
						
						console.log("pushing into entity list..", data);
						/*angular.forEach(data, function(entity){
							console.log("Adding entity : " + entity);
							entityList.push(entity);
						});*/
						if(entityList == null){
							entityList = data;
						}
						else{
							console.log("for each entity..");
							angular.forEach(data, function(entity){
								entityList.push(entity);
							});
						}
						console.log(entityList);
						
						deferred.resolve(data);
					})
					.error(function(reason){
						deferred.reject(reason);
					});
			})
			
			return deferred.promise;
		};

		function createOrUpdateEntity(pid, entity){
			var deferred = $q.defer();
			$http.post("api/project/"+ pid + "/entity", entity)
			.success(function(data){
				deferred.resolve(data);
				entities[data.id]= data;
			})
			.error(function(reason){
				deferred.reject(reason);
			});
			return deferred.promise;
		};

		function deleteEntity(pid, eid){
			var deferred = $q.defer();
			$http.delete("api/project/"+ pid + "/entity/" + eid)
			.success(function(data){
				deferred.resolve(data);
				delete entities[eid];
			})
			.error(function(reason){
				deferred.reject(reason);
			});
			return deferred.promise;
		};
		
	}]);
})();