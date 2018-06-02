package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Prayer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Prayer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrayerRepository extends JpaRepository<Prayer, Long> {

}
