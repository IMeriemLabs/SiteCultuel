package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.SiteCultuelApp;

import com.imeriemlab.sitecultuel.domain.Prayer;
import com.imeriemlab.sitecultuel.repository.PrayerRepository;
import com.imeriemlab.sitecultuel.service.PrayerService;
import com.imeriemlab.sitecultuel.service.dto.PrayerDTO;
import com.imeriemlab.sitecultuel.service.mapper.PrayerMapper;
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
 * Test class for the PrayerResource REST controller.
 *
 * @see PrayerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SiteCultuelApp.class)
public class PrayerResourceIntTest {

    private static final String DEFAULT_SOBH = "AAAAAAAAAA";
    private static final String UPDATED_SOBH = "BBBBBBBBBB";

    private static final String DEFAULT_CHOROUQ = "AAAAAAAAAA";
    private static final String UPDATED_CHOROUQ = "BBBBBBBBBB";

    private static final String DEFAULT_DOHR = "AAAAAAAAAA";
    private static final String UPDATED_DOHR = "BBBBBBBBBB";

    private static final String DEFAULT_ASR = "AAAAAAAAAA";
    private static final String UPDATED_ASR = "BBBBBBBBBB";

    private static final String DEFAULT_MAGHREB = "AAAAAAAAAA";
    private static final String UPDATED_MAGHREB = "BBBBBBBBBB";

    private static final String DEFAULT_ICHA = "AAAAAAAAAA";
    private static final String UPDATED_ICHA = "BBBBBBBBBB";

    @Autowired
    private PrayerRepository prayerRepository;

    @Autowired
    private PrayerMapper prayerMapper;

    @Autowired
    private PrayerService prayerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrayerMockMvc;

    private Prayer prayer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrayerResource prayerResource = new PrayerResource(prayerService);
        this.restPrayerMockMvc = MockMvcBuilders.standaloneSetup(prayerResource)
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
    public static Prayer createEntity(EntityManager em) {
        Prayer prayer = new Prayer()
            .sobh(DEFAULT_SOBH)
            .chorouq(DEFAULT_CHOROUQ)
            .dohr(DEFAULT_DOHR)
            .asr(DEFAULT_ASR)
            .maghreb(DEFAULT_MAGHREB)
            .icha(DEFAULT_ICHA);
        return prayer;
    }

    @Before
    public void initTest() {
        prayer = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrayer() throws Exception {
        int databaseSizeBeforeCreate = prayerRepository.findAll().size();

        // Create the Prayer
        PrayerDTO prayerDTO = prayerMapper.toDto(prayer);
        restPrayerMockMvc.perform(post("/api/prayers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prayerDTO)))
            .andExpect(status().isCreated());

        // Validate the Prayer in the database
        List<Prayer> prayerList = prayerRepository.findAll();
        assertThat(prayerList).hasSize(databaseSizeBeforeCreate + 1);
        Prayer testPrayer = prayerList.get(prayerList.size() - 1);
        assertThat(testPrayer.getSobh()).isEqualTo(DEFAULT_SOBH);
        assertThat(testPrayer.getChorouq()).isEqualTo(DEFAULT_CHOROUQ);
        assertThat(testPrayer.getDohr()).isEqualTo(DEFAULT_DOHR);
        assertThat(testPrayer.getAsr()).isEqualTo(DEFAULT_ASR);
        assertThat(testPrayer.getMaghreb()).isEqualTo(DEFAULT_MAGHREB);
        assertThat(testPrayer.getIcha()).isEqualTo(DEFAULT_ICHA);
    }

    @Test
    @Transactional
    public void createPrayerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prayerRepository.findAll().size();

        // Create the Prayer with an existing ID
        prayer.setId(1L);
        PrayerDTO prayerDTO = prayerMapper.toDto(prayer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrayerMockMvc.perform(post("/api/prayers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prayerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Prayer in the database
        List<Prayer> prayerList = prayerRepository.findAll();
        assertThat(prayerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrayers() throws Exception {
        // Initialize the database
        prayerRepository.saveAndFlush(prayer);

        // Get all the prayerList
        restPrayerMockMvc.perform(get("/api/prayers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prayer.getId().intValue())))
            .andExpect(jsonPath("$.[*].sobh").value(hasItem(DEFAULT_SOBH.toString())))
            .andExpect(jsonPath("$.[*].chorouq").value(hasItem(DEFAULT_CHOROUQ.toString())))
            .andExpect(jsonPath("$.[*].dohr").value(hasItem(DEFAULT_DOHR.toString())))
            .andExpect(jsonPath("$.[*].asr").value(hasItem(DEFAULT_ASR.toString())))
            .andExpect(jsonPath("$.[*].maghreb").value(hasItem(DEFAULT_MAGHREB.toString())))
            .andExpect(jsonPath("$.[*].icha").value(hasItem(DEFAULT_ICHA.toString())));
    }

    @Test
    @Transactional
    public void getPrayer() throws Exception {
        // Initialize the database
        prayerRepository.saveAndFlush(prayer);

        // Get the prayer
        restPrayerMockMvc.perform(get("/api/prayers/{id}", prayer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prayer.getId().intValue()))
            .andExpect(jsonPath("$.sobh").value(DEFAULT_SOBH.toString()))
            .andExpect(jsonPath("$.chorouq").value(DEFAULT_CHOROUQ.toString()))
            .andExpect(jsonPath("$.dohr").value(DEFAULT_DOHR.toString()))
            .andExpect(jsonPath("$.asr").value(DEFAULT_ASR.toString()))
            .andExpect(jsonPath("$.maghreb").value(DEFAULT_MAGHREB.toString()))
            .andExpect(jsonPath("$.icha").value(DEFAULT_ICHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrayer() throws Exception {
        // Get the prayer
        restPrayerMockMvc.perform(get("/api/prayers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrayer() throws Exception {
        // Initialize the database
        prayerRepository.saveAndFlush(prayer);
        int databaseSizeBeforeUpdate = prayerRepository.findAll().size();

        // Update the prayer
        Prayer updatedPrayer = prayerRepository.findOne(prayer.getId());
        updatedPrayer
            .sobh(UPDATED_SOBH)
            .chorouq(UPDATED_CHOROUQ)
            .dohr(UPDATED_DOHR)
            .asr(UPDATED_ASR)
            .maghreb(UPDATED_MAGHREB)
            .icha(UPDATED_ICHA);
        PrayerDTO prayerDTO = prayerMapper.toDto(updatedPrayer);

        restPrayerMockMvc.perform(put("/api/prayers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prayerDTO)))
            .andExpect(status().isOk());

        // Validate the Prayer in the database
        List<Prayer> prayerList = prayerRepository.findAll();
        assertThat(prayerList).hasSize(databaseSizeBeforeUpdate);
        Prayer testPrayer = prayerList.get(prayerList.size() - 1);
        assertThat(testPrayer.getSobh()).isEqualTo(UPDATED_SOBH);
        assertThat(testPrayer.getChorouq()).isEqualTo(UPDATED_CHOROUQ);
        assertThat(testPrayer.getDohr()).isEqualTo(UPDATED_DOHR);
        assertThat(testPrayer.getAsr()).isEqualTo(UPDATED_ASR);
        assertThat(testPrayer.getMaghreb()).isEqualTo(UPDATED_MAGHREB);
        assertThat(testPrayer.getIcha()).isEqualTo(UPDATED_ICHA);
    }

    @Test
    @Transactional
    public void updateNonExistingPrayer() throws Exception {
        int databaseSizeBeforeUpdate = prayerRepository.findAll().size();

        // Create the Prayer
        PrayerDTO prayerDTO = prayerMapper.toDto(prayer);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrayerMockMvc.perform(put("/api/prayers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prayerDTO)))
            .andExpect(status().isCreated());

        // Validate the Prayer in the database
        List<Prayer> prayerList = prayerRepository.findAll();
        assertThat(prayerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrayer() throws Exception {
        // Initialize the database
        prayerRepository.saveAndFlush(prayer);
        int databaseSizeBeforeDelete = prayerRepository.findAll().size();

        // Get the prayer
        restPrayerMockMvc.perform(delete("/api/prayers/{id}", prayer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Prayer> prayerList = prayerRepository.findAll();
        assertThat(prayerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prayer.class);
        Prayer prayer1 = new Prayer();
        prayer1.setId(1L);
        Prayer prayer2 = new Prayer();
        prayer2.setId(prayer1.getId());
        assertThat(prayer1).isEqualTo(prayer2);
        prayer2.setId(2L);
        assertThat(prayer1).isNotEqualTo(prayer2);
        prayer1.setId(null);
        assertThat(prayer1).isNotEqualTo(prayer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrayerDTO.class);
        PrayerDTO prayerDTO1 = new PrayerDTO();
        prayerDTO1.setId(1L);
        PrayerDTO prayerDTO2 = new PrayerDTO();
        assertThat(prayerDTO1).isNotEqualTo(prayerDTO2);
        prayerDTO2.setId(prayerDTO1.getId());
        assertThat(prayerDTO1).isEqualTo(prayerDTO2);
        prayerDTO2.setId(2L);
        assertThat(prayerDTO1).isNotEqualTo(prayerDTO2);
        prayerDTO1.setId(null);
        assertThat(prayerDTO1).isNotEqualTo(prayerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(prayerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(prayerMapper.fromId(null)).isNull();
    }
}
