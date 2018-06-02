package com.imeriemlab.sitecultuel.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Degrees entity.
 */
public class DegreesDTO implements Serializable {

    private Long id;

    private String degree;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DegreesDTO degreesDTO = (DegreesDTO) o;
        if(degreesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), degreesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DegreesDTO{" +
            "id=" + getId() +
            ", degree='" + getDegree() + "'" +
            "}";
    }
}
