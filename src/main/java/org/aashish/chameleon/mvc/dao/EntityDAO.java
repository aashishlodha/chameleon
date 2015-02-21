package org.aashish.chameleon.mvc.dao;

import org.aashish.chameleon.mvc.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EntityDAO{

	@Autowired
	private EntityRepository repository;
	
	public EntityDAO(){
		
	}

	public EntityRepository getRepository() {
		return repository;
	}

	public void setRepository(EntityRepository repository) {
		this.repository = repository;
	}
	
	/*public List<Entity> getEntityById(int id){
		
		List<Entity> e = mongoTemplate.find(Query.query(Criteria.where("id=" + id)), Entity.class);
		return e;
	}*/

}
