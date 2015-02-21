package org.aashish.chameleon.mvc.controller;

import java.util.ArrayList;
import java.util.List;

import org.aashish.chameleon.mvc.model.Project;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
public class ProjectController {

	@RequestMapping(method=RequestMethod.GET)
	public List<Project> getProjects(){
		
		List<Project> projects = new ArrayList();
		Project project1 = new Project();
		project1.setName("Sample Project 1");
		project1.setId(1);
		projects.add(project1);
		Project project2 = new Project();
		project2.setName("Sample Project 2");
		project2.setId(2);
		projects.add(project2);
		
		return projects;
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public Project getProjectById(@PathVariable int id){
		
		Project project = new Project();
		if(id==1){
		project.setName("Sample Project 1");
		project.setId(1);
		}
		if(id==2){
		project.setName("Sample Project 2");
		project.setId(2);
		}
		
		return project;
	}
}
