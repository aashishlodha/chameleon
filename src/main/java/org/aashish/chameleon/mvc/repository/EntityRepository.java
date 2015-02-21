package org.aashish.chameleon.mvc.repository;

import org.aashish.chameleon.mvc.model.Entity;
import org.springframework.data.repository.CrudRepository;

public interface EntityRepository  extends CrudRepository<Entity, String>{

}
