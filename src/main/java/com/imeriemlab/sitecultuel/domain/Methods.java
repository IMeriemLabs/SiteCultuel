package com.imeriemlab.sitecultuel.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * Methods entity.
 * @author The IMeriem team.
 */
@ApiModel(description = "Methods entity. @author The IMeriem team.")
@Entity
@Table(name = "methods")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Methods implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "method")
    private String method;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMethod() {
        return method;
    }

    public Methods method(String method) {
        this.method = method;
        return this;
    }

    public void setMethod(String method) {
        this.method = method;
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
        Methods methods = (Methods) o;
        if (methods.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), methods.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Methods{" +
            "id=" + getId() +
            ", method='" + getMethod() + "'" +
            "}";
    }
}
