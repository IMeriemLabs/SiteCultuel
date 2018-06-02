package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.PrayerService;
import com.imeriemlab.sitecultuel.domain.Prayer;
import com.imeriemlab.sitecultuel.repository.PrayerRepository;
import com.imeriemlab.sitecultuel.service.dto.PrayerDTO;
import com.imeriemlab.sitecultuel.service.mapper.PrayerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Prayer.
 */
@Service
@Transactional
public class PrayerServiceImpl implements PrayerService{

    private final Logger log = LoggerFactory.getLogger(PrayerServiceImpl.class);

    private final PrayerRepository prayerRepository;

    private final PrayerMapper prayerMapper;

    public PrayerServiceImpl(PrayerRepository prayerRepository, PrayerMapper prayerMapper) {
        this.prayerRepository = prayerRepository;
        this.prayerMapper = prayerMapper;
    }

    /**
     * Save a prayer.
     *
     * @param prayerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PrayerDTO save(PrayerDTO prayerDTO) {
        log.debug("Request to save Prayer : {}", prayerDTO);
        Prayer prayer = prayerMapper.toEntity(prayerDTO);
        prayer = prayerRepository.save(prayer);
        return prayerMapper.toDto(prayer);
    }

    /**
     * Get all the prayers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PrayerDTO> findAll() {
        log.debug("Request to get all Prayers");
        return prayerRepository.findAll().stream()
            .map(prayerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one prayer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PrayerDTO findOne(Long id) {
        log.debug("Request to get Prayer : {}", id);
        Prayer prayer = prayerRepository.findOne(id);
        return prayerMapper.toDto(prayer);
    }

    /**
     * Delete the prayer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Prayer : {}", id);
        prayerRepository.delete(id);
    }
}
