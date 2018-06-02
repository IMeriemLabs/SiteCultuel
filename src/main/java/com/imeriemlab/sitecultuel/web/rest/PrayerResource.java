package com.imeriemlab.sitecultuel.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.imeriemlab.sitecultuel.service.PrayerService;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
import com.imeriemlab.sitecultuel.service.dto.PrayerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Prayer.
 */
@RestController
@RequestMapping("/api")
public class PrayerResource {

    private final Logger log = LoggerFactory.getLogger(PrayerResource.class);

    private static final String ENTITY_NAME = "prayer";

    private final PrayerService prayerService;

    public PrayerResource(PrayerService prayerService) {
        this.prayerService = prayerService;
    }

    /**
     * POST  /prayers : Create a new prayer.
     *
     * @param prayerDTO the prayerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prayerDTO, or with status 400 (Bad Request) if the prayer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prayers")
    @Timed
    public ResponseEntity<PrayerDTO> createPrayer(@RequestBody PrayerDTO prayerDTO) throws URISyntaxException {
        log.debug("REST request to save Prayer : {}", prayerDTO);
        if (prayerDTO.getId() != null) {
            throw new BadRequestAlertException("A new prayer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrayerDTO result = prayerService.save(prayerDTO);
        return ResponseEntity.created(new URI("/api/prayers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prayers : Updates an existing prayer.
     *
     * @param prayerDTO the prayerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prayerDTO,
     * or with status 400 (Bad Request) if the prayerDTO is not valid,
     * or with status 500 (Internal Server Error) if the prayerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prayers")
    @Timed
    public ResponseEntity<PrayerDTO> updatePrayer(@RequestBody PrayerDTO prayerDTO) throws URISyntaxException {
        log.debug("REST request to update Prayer : {}", prayerDTO);
        if (prayerDTO.getId() == null) {
            return createPrayer(prayerDTO);
        }
        PrayerDTO result = prayerService.save(prayerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prayerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prayers : get all the prayers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of prayers in body
     */
    @GetMapping("/prayers")
    @Timed
    public List<PrayerDTO> getAllPrayers() {
        log.debug("REST request to get all Prayers");
        return prayerService.findAll();
        }

    /**
     * GET  /prayers/:id : get the "id" prayer.
     *
     * @param id the id of the prayerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prayerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/prayers/{id}")
    @Timed
    public ResponseEntity<PrayerDTO> getPrayer(@PathVariable Long id) {
        log.debug("REST request to get Prayer : {}", id);
        PrayerDTO prayerDTO = prayerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(prayerDTO));
    }

    /**
     * DELETE  /prayers/:id : delete the "id" prayer.
     *
     * @param id the id of the prayerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prayers/{id}")
    @Timed
    public ResponseEntity<Void> deletePrayer(@PathVariable Long id) {
        log.debug("REST request to delete Prayer : {}", id);
        prayerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
