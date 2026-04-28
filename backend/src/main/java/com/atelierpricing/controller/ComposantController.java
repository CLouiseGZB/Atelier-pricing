package com.atelierpricing.controller;

import com.atelierpricing.entity.Composant;
import com.atelierpricing.repository.ComposantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        return composantRepository.save(composant);
    }

    @PutMapping("/{id}")
    public Composant update(@PathVariable Long id, @RequestBody Composant composant) {
        composant.setId(id);
        return composantRepository.save(composant);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        composantRepository.deleteById(id);
    }
}
