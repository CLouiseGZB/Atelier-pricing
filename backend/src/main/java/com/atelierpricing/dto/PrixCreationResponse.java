package com.atelierpricing.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class PrixCreationResponse {
    private BigDecimal coutComposants;
    private BigDecimal coutMainOeuvre;
    private BigDecimal coutTotal;
    private BigDecimal prixConseille;
    private BigDecimal prixBoutique;
    private BigDecimal beneficeEstime;
    private BigDecimal rentabilite;
}
