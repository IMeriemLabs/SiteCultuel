package com.imeriemlab.sitecultuel.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Methods entity.
 */
public class MethodsDTO implements Serializable {

    private Long id;

    private String method;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MethodsDTO methodsDTO = (MethodsDTO) o;
        if(methodsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), methodsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MethodsDTO{" +
            "id=" + getId() +
            ", method='" + getMethod() + "'" +
            "}";
    }
}
