package com.imeriemlab.sitecultuel.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.imeriemlab.sitecultuel.service.DonsService;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
import com.imeriemlab.sitecultuel.service.dto.DonsDTO;
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
 * REST controller for managing Dons.
 */
@RestController
@RequestMapping("/api")
public class DonsResource {

    private final Logger log = LoggerFactory.getLogger(DonsResource.class);

    private static final String ENTITY_NAME = "dons";

    private final DonsService donsService;

    public DonsResource(DonsService donsService) {
        this.donsService = donsService;
    }

    /**
     * POST  /dons : Create a new dons.
     *
     * @param donsDTO the donsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new donsDTO, or with status 400 (Bad Request) if the dons has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dons")
    @Timed
    public ResponseEntity<DonsDTO> createDons(@RequestBody DonsDTO donsDTO) throws URISyntaxException {
        log.debug("REST request to save Dons : {}", donsDTO);
        if (donsDTO.getId() != null) {
            throw new BadRequestAlertException("A new dons cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DonsDTO result = donsService.save(donsDTO);
        return ResponseEntity.created(new URI("/api/dons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dons : Updates an existing dons.
     *
     * @param donsDTO the donsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated donsDTO,
     * or with status 400 (Bad Request) if the donsDTO is not valid,
     * or with status 500 (Internal Server Error) if the donsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dons")
    @Timed
    public ResponseEntity<DonsDTO> updateDons(@RequestBody DonsDTO donsDTO) throws URISyntaxException {
        log.debug("REST request to update Dons : {}", donsDTO);
        if (donsDTO.getId() == null) {
            return createDons(donsDTO);
        }
        DonsDTO result = donsService.save(donsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, donsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dons : get all the dons.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dons in body
     */
    @GetMapping("/dons")
    @Timed
    public List<DonsDTO> getAllDons() {
        log.debug("REST request to get all Dons");
        return donsService.findAll();
        }

    /**
     * GET  /dons/:id : get the "id" dons.
     *
     * @param id the id of the donsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the donsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dons/{id}")
    @Timed
    public ResponseEntity<DonsDTO> getDons(@PathVariable Long id) {
        log.debug("REST request to get Dons : {}", id);
        DonsDTO donsDTO = donsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(donsDTO));
    }

    /**
     * DELETE  /dons/:id : delete the "id" dons.
     *
     * @param id the id of the donsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dons/{id}")
    @Timed
    public ResponseEntity<Void> deleteDons(@PathVariable Long id) {
        log.debug("REST request to delete Dons : {}", id);
        donsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
