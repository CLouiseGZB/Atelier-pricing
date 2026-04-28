package com.atelierpricing.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreationComposantRequest {
    private Long composantId;
    private BigDecimal quantiteUtilisee;
}
