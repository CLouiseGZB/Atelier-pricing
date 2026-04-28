package com.atelierpricing.controller;

import com.atelierpricing.entity.Composant;
import com.atelierpricing.repository.ComposantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RestController
@RequestMapping("/api/composants")
@RequiredArgsConstructor
public class ComposantController {

    private final ComposantRepository composantRepository;

    @GetMapping
    public List<Composant> findAll() {
        return composantRepository.findAll();
    }

    @PostMapping
    public Composant create(@RequestBody Composant composant) {

        if (
                composant.getPrixAchatTotal() != null &&
                        composant.getStock() != null &&
                        composant.getStock().compareTo(BigDecimal.ZERO) > 0
        ) {

            BigDecimal prixUnitaire = composant.getPrixAchatTotal()
                    .divide(composant.getStock(), 2, RoundingMode.HALF_UP);

            composant.setPrixUnitaire(prixUnitaire);
        }

        return composantRepository.save(composant);
    }

    @PutMapping("/{id}")
    public Composant update(@PathVariable Long id, @RequestBody Composant composant) {

        composant.setId(id);

        if (
                composant.getPrixAchatTotal() != null &&
                        composant.getStock() != null &&
                        composant.getStock().compareTo(BigDecimal.ZERO) > 0
        ) {

            BigDecimal prixUnitaire = composant.getPrixAchatTotal()
                    .divide(composant.getStock(), 2, RoundingMode.HALF_UP);

            composant.setPrixUnitaire(prixUnitaire);
        }

        return composantRepository.save(composant);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        composantRepository.deleteById(id);
    }


}
