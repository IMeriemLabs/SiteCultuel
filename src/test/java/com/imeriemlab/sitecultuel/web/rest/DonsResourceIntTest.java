package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.SiteCultuelApp;

import com.imeriemlab.sitecultuel.domain.Dons;
import com.imeriemlab.sitecultuel.repository.DonsRepository;
import com.imeriemlab.sitecultuel.service.DonsService;
import com.imeriemlab.sitecultuel.service.dto.DonsDTO;
import com.imeriemlab.sitecultuel.service.mapper.DonsMapper;
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
 * Test class for the DonsResource REST controller.
 *
 * @see DonsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SiteCultuelApp.class)
public class DonsResourceIntTest {

    private static final String DEFAULT_UUID = "AAAAAAAAAA";
    private static final String UPDATED_UUID = "BBBBBBBBBB";

    private static final Long DEFAULT_DON = 1L;
    private static final Long UPDATED_DON = 2L;

    @Autowired
    private DonsRepository donsRepository;

    @Autowired
    private DonsMapper donsMapper;

    @Autowired
    private DonsService donsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDonsMockMvc;

    private Dons dons;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DonsResource donsResource = new DonsResource(donsService);
        this.restDonsMockMvc = MockMvcBuilders.standaloneSetup(donsResource)
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
    public static Dons createEntity(EntityManager em) {
        Dons dons = new Dons()
            .uuid(DEFAULT_UUID)
            .don(DEFAULT_DON);
        return dons;
    }

    @Before
    public void initTest() {
        dons = createEntity(em);
    }

    @Test
    @Transactional
    public void createDons() throws Exception {
        int databaseSizeBeforeCreate = donsRepository.findAll().size();

        // Create the Dons
        DonsDTO donsDTO = donsMapper.toDto(dons);
        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isCreated());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeCreate + 1);
        Dons testDons = donsList.get(donsList.size() - 1);
        assertThat(testDons.getUuid()).isEqualTo(DEFAULT_UUID);
        assertThat(testDons.getDon()).isEqualTo(DEFAULT_DON);
    }

    @Test
    @Transactional
    public void createDonsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = donsRepository.findAll().size();

        // Create the Dons with an existing ID
        dons.setId(1L);
        DonsDTO donsDTO = donsMapper.toDto(dons);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        // Get all the donsList
        restDonsMockMvc.perform(get("/api/dons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dons.getId().intValue())))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())))
            .andExpect(jsonPath("$.[*].don").value(hasItem(DEFAULT_DON.intValue())));
    }

    @Test
    @Transactional
    public void getDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        // Get the dons
        restDonsMockMvc.perform(get("/api/dons/{id}", dons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dons.getId().intValue()))
            .andExpect(jsonPath("$.uuid").value(DEFAULT_UUID.toString()))
            .andExpect(jsonPath("$.don").value(DEFAULT_DON.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDons() throws Exception {
        // Get the dons
        restDonsMockMvc.perform(get("/api/dons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);
        int databaseSizeBeforeUpdate = donsRepository.findAll().size();

        // Update the dons
        Dons updatedDons = donsRepository.findOne(dons.getId());
        updatedDons
            .uuid(UPDATED_UUID)
            .don(UPDATED_DON);
        DonsDTO donsDTO = donsMapper.toDto(updatedDons);

        restDonsMockMvc.perform(put("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isOk());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeUpdate);
        Dons testDons = donsList.get(donsList.size() - 1);
        assertThat(testDons.getUuid()).isEqualTo(UPDATED_UUID);
        assertThat(testDons.getDon()).isEqualTo(UPDATED_DON);
    }

    @Test
    @Transactional
    public void updateNonExistingDons() throws Exception {
        int databaseSizeBeforeUpdate = donsRepository.findAll().size();

        // Create the Dons
        DonsDTO donsDTO = donsMapper.toDto(dons);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDonsMockMvc.perform(put("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isCreated());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);
        int databaseSizeBeforeDelete = donsRepository.findAll().size();

        // Get the dons
        restDonsMockMvc.perform(delete("/api/dons/{id}", dons.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dons.class);
        Dons dons1 = new Dons();
        dons1.setId(1L);
        Dons dons2 = new Dons();
        dons2.setId(dons1.getId());
        assertThat(dons1).isEqualTo(dons2);
        dons2.setId(2L);
        assertThat(dons1).isNotEqualTo(dons2);
        dons1.setId(null);
        assertThat(dons1).isNotEqualTo(dons2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DonsDTO.class);
        DonsDTO donsDTO1 = new DonsDTO();
        donsDTO1.setId(1L);
        DonsDTO donsDTO2 = new DonsDTO();
        assertThat(donsDTO1).isNotEqualTo(donsDTO2);
        donsDTO2.setId(donsDTO1.getId());
        assertThat(donsDTO1).isEqualTo(donsDTO2);
        donsDTO2.setId(2L);
        assertThat(donsDTO1).isNotEqualTo(donsDTO2);
        donsDTO1.setId(null);
        assertThat(donsDTO1).isNotEqualTo(donsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(donsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(donsMapper.fromId(null)).isNull();
    }
}
