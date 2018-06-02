package com.imeriemlab.sitecultuel.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * Prayer entity.
 * @author The IMeriem team.
 */
@ApiModel(description = "Prayer entity. @author The IMeriem team.")
@Entity
@Table(name = "prayer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prayer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sobh")
    private String sobh;

    @Column(name = "chorouq")
    private String chorouq;

    @Column(name = "dohr")
    private String dohr;

    @Column(name = "asr")
    private String asr;

    @Column(name = "maghreb")
    private String maghreb;

    @Column(name = "icha")
    private String icha;

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

    @OneToOne
    @JoinColumn(unique = true)
    private Methods method;

    @OneToOne
    @JoinColumn(unique = true)
    private Degrees degree;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSobh() {
        return sobh;
    }

    public Prayer sobh(String sobh) {
        this.sobh = sobh;
        return this;
    }

    public void setSobh(String sobh) {
        this.sobh = sobh;
    }

    public String getChorouq() {
        return chorouq;
    }

    public Prayer chorouq(String chorouq) {
        this.chorouq = chorouq;
        return this;
    }

    public void setChorouq(String chorouq) {
        this.chorouq = chorouq;
    }

    public String getDohr() {
        return dohr;
    }

    public Prayer dohr(String dohr) {
        this.dohr = dohr;
        return this;
    }

    public void setDohr(String dohr) {
        this.dohr = dohr;
    }

    public String getAsr() {
        return asr;
    }

    public Prayer asr(String asr) {
        this.asr = asr;
        return this;
    }

    public void setAsr(String asr) {
        this.asr = asr;
    }

    public String getMaghreb() {
        return maghreb;
    }

    public Prayer maghreb(String maghreb) {
        this.maghreb = maghreb;
        return this;
    }

    public void setMaghreb(String maghreb) {
        this.maghreb = maghreb;
    }

    public String getIcha() {
        return icha;
    }

    public Prayer icha(String icha) {
        this.icha = icha;
        return this;
    }

    public void setIcha(String icha) {
        this.icha = icha;
    }

    public Location getLocation() {
        return location;
    }

    public Prayer location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Methods getMethod() {
        return method;
    }

    public Prayer method(Methods methods) {
        this.method = methods;
        return this;
    }

    public void setMethod(Methods methods) {
        this.method = methods;
    }

    public Degrees getDegree() {
        return degree;
    }

    public Prayer degree(Degrees degrees) {
        this.degree = degrees;
        return this;
    }

    public void setDegree(Degrees degrees) {
        this.degree = degrees;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Prayer prayer = (Prayer) o;
        if (prayer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prayer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Prayer{" +
            "id=" + getId() +
            ", sobh='" + getSobh() + "'" +
            ", chorouq='" + getChorouq() + "'" +
            ", dohr='" + getDohr() + "'" +
            ", asr='" + getAsr() + "'" +
            ", maghreb='" + getMaghreb() + "'" +
            ", icha='" + getIcha() + "'" +
            "}";
    }
}
