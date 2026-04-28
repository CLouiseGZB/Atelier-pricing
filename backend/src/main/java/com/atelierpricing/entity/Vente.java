package com.atelierpricing.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "creation_id")
    private Creation creation;

    private BigDecimal prixVendu;

    private LocalDate dateVente = LocalDate.now();

    private String canal;

    private String client;
}
