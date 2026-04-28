package com.atelierpricing.service;

import com.atelierpricing.dto.CreationComposantRequest;
import com.atelierpricing.dto.CreationRequest;
import com.atelierpricing.entity.Composant;
import com.atelierpricing.entity.Creation;
import com.atelierpricing.entity.CreationComposant;
import com.atelierpricing.repository.ComposantRepository;
import com.atelierpricing.repository.CreationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreationService {

    private final CreationRepository creationRepository;
    private final ComposantRepository composantRepository;

    public Creation creer(CreationRequest request) {
        Creation creation = new Creation();
        remplirCreation(creation, request);
        return creationRepository.save(creation);
    }

    public Creation modifier(Long id, CreationRequest request) {
        Creation creation = creationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Création introuvable"));
        creation.getComposants().clear();
        remplirCreation(creation, request);
        return creationRepository.save(creation);
    }

    private void remplirCreation(Creation creation, CreationRequest request) {
        creation.setNom(request.getNom());
        creation.setHeuresTravail(request.getHeuresTravail());
        creation.setTauxHoraire(request.getTauxHoraire());
        creation.setMarge(request.getMarge());
        creation.setAutresCouts(request.getAutresCouts());

        for (CreationComposantRequest ligneRequest : request.getComposants()) {
            Composant composant = composantRepository.findById(ligneRequest.getComposantId())
                    .orElseThrow(() -> new RuntimeException("Composant introuvable"));

            CreationComposant ligne = new CreationComposant();
            ligne.setCreation(creation);
            ligne.setComposant(composant);
            ligne.setQuantiteUtilisee(ligneRequest.getQuantiteUtilisee());
            creation.getComposants().add(ligne);
        }
    }
}
