package org.aashish.chameleon.mvc.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.aashish.chameleon.mvc.dao.EntityDAO;
import org.aashish.chameleon.mvc.model.Entity;
import org.aashish.chameleon.mvc.model.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/{pid}/entity")
public class EntityController {
	
	@Autowired
	private EntityDAO entityDAO;
	
	@Autowired
	private MongoOperations mongoOps;
	
	@RequestMapping(method=RequestMethod.GET)
	public Iterable<Entity> getEntities(@PathVariable int pid){
		
		Iterable<Entity> entityList = mongoOps.find(Query.query(Criteria.where("pid").is(pid)), Entity.class);
		return entityList;
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public Entity addEntity(@PathVariable int pid, @RequestBody Entity entity){
		
		if(entity.getId() == 0){
			entity.setId(nextSequenceForEntity(pid) + 1);
		}
		
		mongoOps.save(entity);
		return entity;
	}
	
	@RequestMapping(value="/{eid}", method=RequestMethod.GET)
	public Entity getEntity(@PathVariable int pid, @PathVariable int eid){
		entityDAO.getRepository().findOne("");
		Entity entity = mongoOps.findOne(Query.query(Criteria.where("id").is(eid)),Entity.class);
		return entity;
	}
	
	/*@RequestMapping(value="/{eid}",method=RequestMethod.POST)
	public Entity updateEntity(@PathVariable int pid, @PathVariable int eid, @RequestBody Entity entity){
		
		mongoOps.save(entity);
		return entity;
	}*/
	
	@RequestMapping(value="/{eid}",method=RequestMethod.DELETE)
	public String deleteEntity(@PathVariable int pid, @PathVariable int eid){
		
		mongoOps.findAndRemove(Query.query(Criteria.where("id").is(eid)), Entity.class);
		return "";
	}
	
	public int nextSequenceForEntity(int pid){
		//Iterable<Entity> entities = mongoOps.find(Query.query(Criteria.where("pid").is(pid)), Entity.class);
		Iterable<Entity> entities = mongoOps.findAll(Entity.class);
		int sequencNo = 1;
		
		Iterator<Entity> iterator = entities.iterator();
		while(iterator.hasNext()){
			Entity entity = iterator.next();
			if(sequencNo < entity.getId()){
				sequencNo = entity.getId();
			}
		}
		return sequencNo;
	}

}
