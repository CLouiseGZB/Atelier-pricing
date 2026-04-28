package com.atelierpricing.service;

import com.atelierpricing.dto.PrixCreationResponse;
import com.atelierpricing.entity.Creation;
import com.atelierpricing.entity.CreationComposant;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PrixService {

    public PrixCreationResponse calculerPrix(Creation creation) {
        BigDecimal coutComposants = creation.getComposants()
                .stream()
                .map(this::calculerLigneComposant)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal coutMainOeuvre = safe(creation.getHeuresTravail())
                .multiply(safe(creation.getTauxHoraire()));

        BigDecimal coutTotal = coutComposants
                .add(coutMainOeuvre)
                .add(safe(creation.getAutresCouts()));

        BigDecimal prixConseille = coutTotal.multiply(BigDecimal.ONE.add(safe(creation.getMarge())));
        BigDecimal prixBoutique = arrondirPrixBoutique(prixConseille);
        BigDecimal benefice = prixBoutique.subtract(coutTotal);

        BigDecimal rentabilite = prixBoutique.compareTo(BigDecimal.ZERO) == 0
                ? BigDecimal.ZERO
                : benefice.divide(prixBoutique, 4, RoundingMode.HALF_UP);

        return new PrixCreationResponse(
                money(coutComposants),
                money(coutMainOeuvre),
                money(coutTotal),
                money(prixConseille),
                money(prixBoutique),
                money(benefice),
                rentabilite
        );
    }

    private BigDecimal calculerLigneComposant(CreationComposant ligne) {
        if (ligne.getComposant() == null || ligne.getComposant().getPrixUnitaire() == null) {
            return BigDecimal.ZERO;
        }
        return safe(ligne.getQuantiteUtilisee()).multiply(ligne.getComposant().getPrixUnitaire());
    }

    private BigDecimal arrondirPrixBoutique(BigDecimal prix) {
        if (prix == null || prix.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO;
        }
        return prix.setScale(0, RoundingMode.UP).subtract(BigDecimal.ONE).add(new BigDecimal("0.90"));
    }

    private BigDecimal safe(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }

    private BigDecimal money(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
