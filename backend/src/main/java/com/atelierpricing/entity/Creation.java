package com.atelierpricing.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Creation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nom;

    private BigDecimal heuresTravail = BigDecimal.ZERO;

    private BigDecimal tauxHoraire = new BigDecimal("15.00");

    private BigDecimal marge = new BigDecimal("0.40");

    private BigDecimal autresCouts = BigDecimal.ZERO;

    private LocalDate dateCreation = LocalDate.now();

    @OneToMany(mappedBy = "creation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CreationComposant> composants = new ArrayList<>();
}
