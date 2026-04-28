package com.atelierpricing.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreationComposant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "creation_id")
    @JsonIgnore
    private Creation creation;

    @ManyToOne
    @JoinColumn(name = "composant_id")
    private Composant composant;

    private BigDecimal quantiteUtilisee = BigDecimal.ZERO;
}
