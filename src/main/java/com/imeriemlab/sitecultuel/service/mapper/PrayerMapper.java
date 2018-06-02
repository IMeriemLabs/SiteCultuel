package com.imeriemlab.sitecultuel.service.mapper;

import com.imeriemlab.sitecultuel.domain.*;
import com.imeriemlab.sitecultuel.service.dto.PrayerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Prayer and its DTO PrayerDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, MethodsMapper.class, DegreesMapper.class})
public interface PrayerMapper extends EntityMapper<PrayerDTO, Prayer> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "method.id", target = "methodId")
    @Mapping(source = "degree.id", target = "degreeId")
    PrayerDTO toDto(Prayer prayer); 

    @Mapping(source = "locationId", target = "location")
    @Mapping(source = "methodId", target = "method")
    @Mapping(source = "degreeId", target = "degree")
    Prayer toEntity(PrayerDTO prayerDTO);

    default Prayer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Prayer prayer = new Prayer();
        prayer.setId(id);
        return prayer;
    }
}
