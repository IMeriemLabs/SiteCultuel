package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.DegreesService;
import com.imeriemlab.sitecultuel.domain.Degrees;
import com.imeriemlab.sitecultuel.repository.DegreesRepository;
import com.imeriemlab.sitecultuel.service.dto.DegreesDTO;
import com.imeriemlab.sitecultuel.service.mapper.DegreesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Degrees.
 */
@Service
@Transactional
public class DegreesServiceImpl implements DegreesService{

    private final Logger log = LoggerFactory.getLogger(DegreesServiceImpl.class);

    private final DegreesRepository degreesRepository;

    private final DegreesMapper degreesMapper;

    public DegreesServiceImpl(DegreesRepository degreesRepository, DegreesMapper degreesMapper) {
        this.degreesRepository = degreesRepository;
        this.degreesMapper = degreesMapper;
    }

    /**
     * Save a degrees.
     *
     * @param degreesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DegreesDTO save(DegreesDTO degreesDTO) {
        log.debug("Request to save Degrees : {}", degreesDTO);
        Degrees degrees = degreesMapper.toEntity(degreesDTO);
        degrees = degreesRepository.save(degrees);
        return degreesMapper.toDto(degrees);
    }

    /**
     * Get all the degrees.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DegreesDTO> findAll() {
        log.debug("Request to get all Degrees");
        return degreesRepository.findAll().stream()
            .map(degreesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one degrees by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DegreesDTO findOne(Long id) {
        log.debug("Request to get Degrees : {}", id);
        Degrees degrees = degreesRepository.findOne(id);
        return degreesMapper.toDto(degrees);
    }

    /**
     * Delete the degrees by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Degrees : {}", id);
        degreesRepository.delete(id);
    }
}
