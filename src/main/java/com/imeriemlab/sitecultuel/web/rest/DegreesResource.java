package com.imeriemlab.sitecultuel.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.imeriemlab.sitecultuel.service.DegreesService;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
import com.imeriemlab.sitecultuel.service.dto.DegreesDTO;
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
 * REST controller for managing Degrees.
 */
@RestController
@RequestMapping("/api")
public class DegreesResource {

    private final Logger log = LoggerFactory.getLogger(DegreesResource.class);

    private static final String ENTITY_NAME = "degrees";

    private final DegreesService degreesService;

    public DegreesResource(DegreesService degreesService) {
        this.degreesService = degreesService;
    }

    /**
     * POST  /degrees : Create a new degrees.
     *
     * @param degreesDTO the degreesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new degreesDTO, or with status 400 (Bad Request) if the degrees has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/degrees")
    @Timed
    public ResponseEntity<DegreesDTO> createDegrees(@RequestBody DegreesDTO degreesDTO) throws URISyntaxException {
        log.debug("REST request to save Degrees : {}", degreesDTO);
        if (degreesDTO.getId() != null) {
            throw new BadRequestAlertException("A new degrees cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DegreesDTO result = degreesService.save(degreesDTO);
        return ResponseEntity.created(new URI("/api/degrees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /degrees : Updates an existing degrees.
     *
     * @param degreesDTO the degreesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated degreesDTO,
     * or with status 400 (Bad Request) if the degreesDTO is not valid,
     * or with status 500 (Internal Server Error) if the degreesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/degrees")
    @Timed
    public ResponseEntity<DegreesDTO> updateDegrees(@RequestBody DegreesDTO degreesDTO) throws URISyntaxException {
        log.debug("REST request to update Degrees : {}", degreesDTO);
        if (degreesDTO.getId() == null) {
            return createDegrees(degreesDTO);
        }
        DegreesDTO result = degreesService.save(degreesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, degreesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /degrees : get all the degrees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of degrees in body
     */
    @GetMapping("/degrees")
    @Timed
    public List<DegreesDTO> getAllDegrees() {
        log.debug("REST request to get all Degrees");
        return degreesService.findAll();
        }

    /**
     * GET  /degrees/:id : get the "id" degrees.
     *
     * @param id the id of the degreesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the degreesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/degrees/{id}")
    @Timed
    public ResponseEntity<DegreesDTO> getDegrees(@PathVariable Long id) {
        log.debug("REST request to get Degrees : {}", id);
        DegreesDTO degreesDTO = degreesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(degreesDTO));
    }

    /**
     * DELETE  /degrees/:id : delete the "id" degrees.
     *
     * @param id the id of the degreesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/degrees/{id}")
    @Timed
    public ResponseEntity<Void> deleteDegrees(@PathVariable Long id) {
        log.debug("REST request to delete Degrees : {}", id);
        degreesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
