package com.imeriemlab.sitecultuel.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.imeriemlab.sitecultuel.service.MethodsService;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
import com.imeriemlab.sitecultuel.service.dto.MethodsDTO;
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
 * REST controller for managing Methods.
 */
@RestController
@RequestMapping("/api")
public class MethodsResource {

    private final Logger log = LoggerFactory.getLogger(MethodsResource.class);

    private static final String ENTITY_NAME = "methods";

    private final MethodsService methodsService;

    public MethodsResource(MethodsService methodsService) {
        this.methodsService = methodsService;
    }

    /**
     * POST  /methods : Create a new methods.
     *
     * @param methodsDTO the methodsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new methodsDTO, or with status 400 (Bad Request) if the methods has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/methods")
    @Timed
    public ResponseEntity<MethodsDTO> createMethods(@RequestBody MethodsDTO methodsDTO) throws URISyntaxException {
        log.debug("REST request to save Methods : {}", methodsDTO);
        if (methodsDTO.getId() != null) {
            throw new BadRequestAlertException("A new methods cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MethodsDTO result = methodsService.save(methodsDTO);
        return ResponseEntity.created(new URI("/api/methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /methods : Updates an existing methods.
     *
     * @param methodsDTO the methodsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated methodsDTO,
     * or with status 400 (Bad Request) if the methodsDTO is not valid,
     * or with status 500 (Internal Server Error) if the methodsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/methods")
    @Timed
    public ResponseEntity<MethodsDTO> updateMethods(@RequestBody MethodsDTO methodsDTO) throws URISyntaxException {
        log.debug("REST request to update Methods : {}", methodsDTO);
        if (methodsDTO.getId() == null) {
            return createMethods(methodsDTO);
        }
        MethodsDTO result = methodsService.save(methodsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, methodsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /methods : get all the methods.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of methods in body
     */
    @GetMapping("/methods")
    @Timed
    public List<MethodsDTO> getAllMethods() {
        log.debug("REST request to get all Methods");
        return methodsService.findAll();
        }

    /**
     * GET  /methods/:id : get the "id" methods.
     *
     * @param id the id of the methodsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the methodsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/methods/{id}")
    @Timed
    public ResponseEntity<MethodsDTO> getMethods(@PathVariable Long id) {
        log.debug("REST request to get Methods : {}", id);
        MethodsDTO methodsDTO = methodsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(methodsDTO));
    }

    /**
     * DELETE  /methods/:id : delete the "id" methods.
     *
     * @param id the id of the methodsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/methods/{id}")
    @Timed
    public ResponseEntity<Void> deleteMethods(@PathVariable Long id) {
        log.debug("REST request to delete Methods : {}", id);
        methodsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
