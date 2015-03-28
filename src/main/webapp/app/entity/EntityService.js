(function(){
	var app = angular.module("chameleon");
	app.factory('entityService',['$http','$q','$routeParams',function($http,$q){

		var projectList = null;
		var selectedProject = null;
		var entityList = [];
		var selectedEntity = null;

		console.log("Creating service object for entityService..");
		var service = {
			changeProject : changeProject,
			setSelectedProject : setSelectedProject,
			getSelectedProject : getSelectedProject,
			getProjectById : getProjectById,
			getProjectList : getProjectList,
			setProjectList : setProjectList,
			getEntity : getEntity,
			getEntitiesForProject : getEntitiesForProject,
			createOrUpdateEntity : createOrUpdateEntity,
			deleteEntity : deleteEntity
		};

		return service;

		function getProjectById(pid){
			console.log("inside getProjectById() >> pid >>" +pid +"," + projectList);

			var projectNeeded;
			angular.forEach(projectList, function(project){
				console.log(project);
				if(project.id == pid){
					console.log("found the project >>" + project);
					projectNeeded = project;
				}
			});
			return projectNeeded;
		}

		function setProjectList(projects){
			projectList = projects;
		}

		function getSelectedProject(){
			return selectedProject;
		};

		function setSelectedProject(project){
			console.log("setting selected project >> " + project);
			selectedProject= project;
		};
		
		function getProjectList(){
			var deferred = $q.defer();

			if(!projectList){
				console.log("Getting the Project list for the first time..");

				$http.get("api/project")
				.success(function(projects){
					projectList = projects;
					
					//selectedProject == projectList[0];
					deferred.resolve(projectList);
				})
				.error(function(reason){
					deferred.reject(reason);
				});
			}else{
				deferred.resolve(projectList);
			}
			
			return deferred.promise;
		};

		function getEntitiesForProject(){
			var deferred = $q.defer();
			console.log("inside getEntitiesForProject >> selectedProject " + selectedProject);

			var pid = selectedProject.id;

			console.log("splicing entity list..");
			entityList.splice(0,entityList.length);
			console.log(entityList);
			
			$http.get("api/project/"+pid+"/entity")
			.success(function(entities){
				//entityList = entities;
				angular.forEach(entities, function(entity){
					// console.log("Entity :" + entity);
					entityList.push(entity);
				});
				deferred.resolve(entityList);
			})
			.error(function(reason){
				deferred.reject(reason);
			});
		
			return deferred.promise;
		};

		function getEntity(pid, eid){

			var deferred = $q.defer();
			
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

		function changeProject(project){
			var deferred = $q.defer();

			console.log("Changing selectedProject >>" + selectedProject);
			selectedProject = project;

			/*console.log("splicing entity list..");
			entityList.splice(0,entityList.length);
			console.log(entityList);
			
			getEntitiesForProject(pid);*/
			deferred.resolve(selectedProject);
			return deferred.promise;
		};
		
	}]);
})();