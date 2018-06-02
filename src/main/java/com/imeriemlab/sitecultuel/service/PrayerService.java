package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.service.dto.PrayerDTO;
import java.util.List;

/**
 * Service Interface for managing Prayer.
 */
public interface PrayerService {

    /**
     * Save a prayer.
     *
     * @param prayerDTO the entity to save
     * @return the persisted entity
     */
    PrayerDTO save(PrayerDTO prayerDTO);

    /**
     * Get all the prayers.
     *
     * @return the list of entities
     */
    List<PrayerDTO> findAll();

    /**
     * Get the "id" prayer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PrayerDTO findOne(Long id);

    /**
     * Delete the "id" prayer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
