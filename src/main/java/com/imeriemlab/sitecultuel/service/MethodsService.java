package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.service.dto.MethodsDTO;
import java.util.List;

/**
 * Service Interface for managing Methods.
 */
public interface MethodsService {

    /**
     * Save a methods.
     *
     * @param methodsDTO the entity to save
     * @return the persisted entity
     */
    MethodsDTO save(MethodsDTO methodsDTO);

    /**
     * Get all the methods.
     *
     * @return the list of entities
     */
    List<MethodsDTO> findAll();

    /**
     * Get the "id" methods.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MethodsDTO findOne(Long id);

    /**
     * Delete the "id" methods.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
