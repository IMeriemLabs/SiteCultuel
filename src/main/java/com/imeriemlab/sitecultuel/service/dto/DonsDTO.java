package com.imeriemlab.sitecultuel.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Dons entity.
 */
public class DonsDTO implements Serializable {

    private Long id;

    private String uuid;

    private Long don;

    private Long customerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Long getDon() {
        return don;
    }

    public void setDon(Long don) {
        this.don = don;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DonsDTO donsDTO = (DonsDTO) o;
        if(donsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), donsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DonsDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", don=" + getDon() +
            "}";
    }
}
