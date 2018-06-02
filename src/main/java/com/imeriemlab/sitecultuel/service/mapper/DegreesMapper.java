package com.imeriemlab.sitecultuel.service.mapper;

import com.imeriemlab.sitecultuel.domain.*;
import com.imeriemlab.sitecultuel.service.dto.DegreesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Degrees and its DTO DegreesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DegreesMapper extends EntityMapper<DegreesDTO, Degrees> {

    

    

    default Degrees fromId(Long id) {
        if (id == null) {
            return null;
        }
        Degrees degrees = new Degrees();
        degrees.setId(id);
        return degrees;
    }
}
