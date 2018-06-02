package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.SiteCultuelApp;

import com.imeriemlab.sitecultuel.domain.Degrees;
import com.imeriemlab.sitecultuel.repository.DegreesRepository;
import com.imeriemlab.sitecultuel.service.DegreesService;
import com.imeriemlab.sitecultuel.service.dto.DegreesDTO;
import com.imeriemlab.sitecultuel.service.mapper.DegreesMapper;
import com.imeriemlab.sitecultuel.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.imeriemlab.sitecultuel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DegreesResource REST controller.
 *
 * @see DegreesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SiteCultuelApp.class)
public class DegreesResourceIntTest {

    private static final String DEFAULT_DEGREE = "AAAAAAAAAA";
    private static final String UPDATED_DEGREE = "BBBBBBBBBB";

    @Autowired
    private DegreesRepository degreesRepository;

    @Autowired
    private DegreesMapper degreesMapper;

    @Autowired
    private DegreesService degreesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDegreesMockMvc;

    private Degrees degrees;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DegreesResource degreesResource = new DegreesResource(degreesService);
        this.restDegreesMockMvc = MockMvcBuilders.standaloneSetup(degreesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Degrees createEntity(EntityManager em) {
        Degrees degrees = new Degrees()
            .degree(DEFAULT_DEGREE);
        return degrees;
    }

    @Before
    public void initTest() {
        degrees = createEntity(em);
    }

    @Test
    @Transactional
    public void createDegrees() throws Exception {
        int databaseSizeBeforeCreate = degreesRepository.findAll().size();

        // Create the Degrees
        DegreesDTO degreesDTO = degreesMapper.toDto(degrees);
        restDegreesMockMvc.perform(post("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degreesDTO)))
            .andExpect(status().isCreated());

        // Validate the Degrees in the database
        List<Degrees> degreesList = degreesRepository.findAll();
        assertThat(degreesList).hasSize(databaseSizeBeforeCreate + 1);
        Degrees testDegrees = degreesList.get(degreesList.size() - 1);
        assertThat(testDegrees.getDegree()).isEqualTo(DEFAULT_DEGREE);
    }

    @Test
    @Transactional
    public void createDegreesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = degreesRepository.findAll().size();

        // Create the Degrees with an existing ID
        degrees.setId(1L);
        DegreesDTO degreesDTO = degreesMapper.toDto(degrees);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDegreesMockMvc.perform(post("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degreesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Degrees in the database
        List<Degrees> degreesList = degreesRepository.findAll();
        assertThat(degreesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDegrees() throws Exception {
        // Initialize the database
        degreesRepository.saveAndFlush(degrees);

        // Get all the degreesList
        restDegreesMockMvc.perform(get("/api/degrees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(degrees.getId().intValue())))
            .andExpect(jsonPath("$.[*].degree").value(hasItem(DEFAULT_DEGREE.toString())));
    }

    @Test
    @Transactional
    public void getDegrees() throws Exception {
        // Initialize the database
        degreesRepository.saveAndFlush(degrees);

        // Get the degrees
        restDegreesMockMvc.perform(get("/api/degrees/{id}", degrees.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(degrees.getId().intValue()))
            .andExpect(jsonPath("$.degree").value(DEFAULT_DEGREE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDegrees() throws Exception {
        // Get the degrees
        restDegreesMockMvc.perform(get("/api/degrees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDegrees() throws Exception {
        // Initialize the database
        degreesRepository.saveAndFlush(degrees);
        int databaseSizeBeforeUpdate = degreesRepository.findAll().size();

        // Update the degrees
        Degrees updatedDegrees = degreesRepository.findOne(degrees.getId());
        updatedDegrees
            .degree(UPDATED_DEGREE);
        DegreesDTO degreesDTO = degreesMapper.toDto(updatedDegrees);

        restDegreesMockMvc.perform(put("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degreesDTO)))
            .andExpect(status().isOk());

        // Validate the Degrees in the database
        List<Degrees> degreesList = degreesRepository.findAll();
        assertThat(degreesList).hasSize(databaseSizeBeforeUpdate);
        Degrees testDegrees = degreesList.get(degreesList.size() - 1);
        assertThat(testDegrees.getDegree()).isEqualTo(UPDATED_DEGREE);
    }

    @Test
    @Transactional
    public void updateNonExistingDegrees() throws Exception {
        int databaseSizeBeforeUpdate = degreesRepository.findAll().size();

        // Create the Degrees
        DegreesDTO degreesDTO = degreesMapper.toDto(degrees);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDegreesMockMvc.perform(put("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degreesDTO)))
            .andExpect(status().isCreated());

        // Validate the Degrees in the database
        List<Degrees> degreesList = degreesRepository.findAll();
        assertThat(degreesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDegrees() throws Exception {
        // Initialize the database
        degreesRepository.saveAndFlush(degrees);
        int databaseSizeBeforeDelete = degreesRepository.findAll().size();

        // Get the degrees
        restDegreesMockMvc.perform(delete("/api/degrees/{id}", degrees.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Degrees> degreesList = degreesRepository.findAll();
        assertThat(degreesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Degrees.class);
        Degrees degrees1 = new Degrees();
        degrees1.setId(1L);
        Degrees degrees2 = new Degrees();
        degrees2.setId(degrees1.getId());
        assertThat(degrees1).isEqualTo(degrees2);
        degrees2.setId(2L);
        assertThat(degrees1).isNotEqualTo(degrees2);
        degrees1.setId(null);
        assertThat(degrees1).isNotEqualTo(degrees2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DegreesDTO.class);
        DegreesDTO degreesDTO1 = new DegreesDTO();
        degreesDTO1.setId(1L);
        DegreesDTO degreesDTO2 = new DegreesDTO();
        assertThat(degreesDTO1).isNotEqualTo(degreesDTO2);
        degreesDTO2.setId(degreesDTO1.getId());
        assertThat(degreesDTO1).isEqualTo(degreesDTO2);
        degreesDTO2.setId(2L);
        assertThat(degreesDTO1).isNotEqualTo(degreesDTO2);
        degreesDTO1.setId(null);
        assertThat(degreesDTO1).isNotEqualTo(degreesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(degreesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(degreesMapper.fromId(null)).isNull();
    }
}
