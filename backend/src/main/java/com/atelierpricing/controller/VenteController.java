package com.atelierpricing.controller;

import com.atelierpricing.dto.VenteRequest;
import com.atelierpricing.entity.Creation;
import com.atelierpricing.entity.Vente;
import com.atelierpricing.repository.CreationRepository;
import com.atelierpricing.repository.VenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventes")
@RequiredArgsConstructor
public class VenteController {

    private final VenteRepository venteRepository;
    private final CreationRepository creationRepository;

    @GetMapping
    public List<Vente> findAll() {
        return venteRepository.findAll();
    }

    @PostMapping
    public Vente create(@RequestBody VenteRequest request) {
        Creation creation = creationRepository.findById(request.getCreationId())
                .orElseThrow(() -> new RuntimeException("Création introuvable"));

        Vente vente = new Vente();
        vente.setCreation(creation);
        vente.setPrixVendu(request.getPrixVendu());
        vente.setDateVente(request.getDateVente());
        vente.setCanal(request.getCanal());
        vente.setClient(request.getClient());

        return venteRepository.save(vente);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        venteRepository.deleteById(id);
    }
}
