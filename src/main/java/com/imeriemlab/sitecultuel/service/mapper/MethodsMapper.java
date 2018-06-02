package com.imeriemlab.sitecultuel.service.mapper;

import com.imeriemlab.sitecultuel.domain.*;
import com.imeriemlab.sitecultuel.service.dto.MethodsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Methods and its DTO MethodsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MethodsMapper extends EntityMapper<MethodsDTO, Methods> {

    

    

    default Methods fromId(Long id) {
        if (id == null) {
            return null;
        }
        Methods methods = new Methods();
        methods.setId(id);
        return methods;
    }
}
