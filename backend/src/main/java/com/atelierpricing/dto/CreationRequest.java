package com.atelierpricing.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CreationRequest {
    private String nom;
    private BigDecimal heuresTravail;
    private BigDecimal tauxHoraire;
    private BigDecimal marge;
    private BigDecimal autresCouts;
    private List<CreationComposantRequest> composants = new ArrayList<>();
}
