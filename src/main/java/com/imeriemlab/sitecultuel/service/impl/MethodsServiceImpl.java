package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.MethodsService;
import com.imeriemlab.sitecultuel.domain.Methods;
import com.imeriemlab.sitecultuel.repository.MethodsRepository;
import com.imeriemlab.sitecultuel.service.dto.MethodsDTO;
import com.imeriemlab.sitecultuel.service.mapper.MethodsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Methods.
 */
@Service
@Transactional
public class MethodsServiceImpl implements MethodsService{

    private final Logger log = LoggerFactory.getLogger(MethodsServiceImpl.class);

    private final MethodsRepository methodsRepository;

    private final MethodsMapper methodsMapper;

    public MethodsServiceImpl(MethodsRepository methodsRepository, MethodsMapper methodsMapper) {
        this.methodsRepository = methodsRepository;
        this.methodsMapper = methodsMapper;
    }

    /**
     * Save a methods.
     *
     * @param methodsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MethodsDTO save(MethodsDTO methodsDTO) {
        log.debug("Request to save Methods : {}", methodsDTO);
        Methods methods = methodsMapper.toEntity(methodsDTO);
        methods = methodsRepository.save(methods);
        return methodsMapper.toDto(methods);
    }

    /**
     * Get all the methods.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MethodsDTO> findAll() {
        log.debug("Request to get all Methods");
        return methodsRepository.findAll().stream()
            .map(methodsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one methods by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MethodsDTO findOne(Long id) {
        log.debug("Request to get Methods : {}", id);
        Methods methods = methodsRepository.findOne(id);
        return methodsMapper.toDto(methods);
    }

    /**
     * Delete the methods by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Methods : {}", id);
        methodsRepository.delete(id);
    }
}
