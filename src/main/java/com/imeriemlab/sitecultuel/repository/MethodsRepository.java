package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Methods;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Methods entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MethodsRepository extends JpaRepository<Methods, Long> {

}
