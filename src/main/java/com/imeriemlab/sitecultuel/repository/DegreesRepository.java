package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Degrees;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Degrees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DegreesRepository extends JpaRepository<Degrees, Long> {

}
