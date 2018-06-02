package com.imeriemlab.sitecultuel.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Prayer entity.
 */
public class PrayerDTO implements Serializable {

    private Long id;

    private String sobh;

    private String chorouq;

    private String dohr;

    private String asr;

    private String maghreb;

    private String icha;

    private Long locationId;

    private Long methodId;

    private Long degreeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSobh() {
        return sobh;
    }

    public void setSobh(String sobh) {
        this.sobh = sobh;
    }

    public String getChorouq() {
        return chorouq;
    }

    public void setChorouq(String chorouq) {
        this.chorouq = chorouq;
    }

    public String getDohr() {
        return dohr;
    }

    public void setDohr(String dohr) {
        this.dohr = dohr;
    }

    public String getAsr() {
        return asr;
    }

    public void setAsr(String asr) {
        this.asr = asr;
    }

    public String getMaghreb() {
        return maghreb;
    }

    public void setMaghreb(String maghreb) {
        this.maghreb = maghreb;
    }

    public String getIcha() {
        return icha;
    }

    public void setIcha(String icha) {
        this.icha = icha;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Long getMethodId() {
        return methodId;
    }

    public void setMethodId(Long methodsId) {
        this.methodId = methodsId;
    }

    public Long getDegreeId() {
        return degreeId;
    }

    public void setDegreeId(Long degreesId) {
        this.degreeId = degreesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PrayerDTO prayerDTO = (PrayerDTO) o;
        if(prayerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prayerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrayerDTO{" +
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
