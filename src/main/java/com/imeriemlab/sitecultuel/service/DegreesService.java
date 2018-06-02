package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.service.dto.DegreesDTO;
import java.util.List;

/**
 * Service Interface for managing Degrees.
 */
public interface DegreesService {

    /**
     * Save a degrees.
     *
     * @param degreesDTO the entity to save
     * @return the persisted entity
     */
    DegreesDTO save(DegreesDTO degreesDTO);

    /**
     * Get all the degrees.
     *
     * @return the list of entities
     */
    List<DegreesDTO> findAll();

    /**
     * Get the "id" degrees.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DegreesDTO findOne(Long id);

    /**
     * Delete the "id" degrees.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
