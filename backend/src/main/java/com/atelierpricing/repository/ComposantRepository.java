package com.atelierpricing.repository;

import com.atelierpricing.entity.Composant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComposantRepository extends JpaRepository<Composant, Long> {
}
