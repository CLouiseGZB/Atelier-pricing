package com.atelierpricing.controller;

import com.atelierpricing.dto.CreationRequest;
import com.atelierpricing.dto.PrixCreationResponse;
import com.atelierpricing.entity.Creation;
import com.atelierpricing.repository.CreationRepository;
import com.atelierpricing.service.CreationService;
import com.atelierpricing.service.PrixService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/creations")
@RequiredArgsConstructor
public class CreationController {

    private final CreationRepository creationRepository;
    private final CreationService creationService;
    private final PrixService prixService;

    @GetMapping
    public List<Creation> findAll() {
        return creationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Creation findById(@PathVariable Long id) {
        return creationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Création introuvable"));
    }

    @PostMapping
    public Creation create(@RequestBody CreationRequest request) {
        return creationService.creer(request);
    }

    @PutMapping("/{id}")
    public Creation update(@PathVariable Long id, @RequestBody CreationRequest request) {
        return creationService.modifier(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        creationRepository.deleteById(id);
    }

    @GetMapping("/{id}/prix")
    public PrixCreationResponse calculerPrix(@PathVariable Long id) {
        Creation creation = creationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Création introuvable"));
        return prixService.calculerPrix(creation);
    }
}
