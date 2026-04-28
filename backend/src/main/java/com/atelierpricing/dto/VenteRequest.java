package com.atelierpricing.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class VenteRequest {
    private Long creationId;
    private BigDecimal prixVendu;
    private LocalDate dateVente;
    private String canal;
    private String client;
}
