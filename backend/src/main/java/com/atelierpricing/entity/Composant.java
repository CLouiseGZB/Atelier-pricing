package com.atelierpricing.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Composant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nom;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TypeComposant type;

    @NotNull
    private BigDecimal prixAchatTotal;

    private BigDecimal prixUnitaire;

    @NotBlank
    private String unite;

    private BigDecimal stock = BigDecimal.ZERO;

    private String fournisseur;

    private LocalDate dateAchat;
}
