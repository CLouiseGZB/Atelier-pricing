import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Composant } from '../../models/composant.model';
import { Creation, CreationRequest, PrixCreation } from '../../models/creation.model';
import { ComposantService } from '../../services/composant.service';
import { CreationService } from '../../services/creation.service';

interface LigneForm {
  composantId: number | null;
  quantiteUtilisee: number;
}

@Component({
  selector: 'app-creations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="page-title">Créations</h1>

    <section class="card">
      <h2>Nouvelle création</h2>

      <form (ngSubmit)="save()">
        <div class="form">
          <label>Nom
            <input name="nom" [(ngModel)]="nom" required>
          </label>

          <label>Heures de travail
            <input type="number" step="0.01" name="heuresTravail" [(ngModel)]="heuresTravail">
          </label>

          <label>Taux horaire
            <input type="number" step="0.01" name="tauxHoraire" [(ngModel)]="tauxHoraire">
          </label>

          <label>Marge
            <input type="number" step="0.01" name="marge" [(ngModel)]="marge">
          </label>

          <label>Autres coûts
            <input type="number" step="0.01" name="autresCouts" [(ngModel)]="autresCouts">
          </label>
        </div>

        <h3>Composants utilisés</h3>

        <div *ngFor="let ligne of lignes; let i = index" class="component-row">
          <label>Composant
            <select [name]="'composant' + i" [(ngModel)]="ligne.composantId">
              <option [ngValue]="null">Choisir</option>
              <option *ngFor="let composant of composants" [ngValue]="composant.id">
                {{ composant.nom }} - {{ composant.prixUnitaire | currency:'EUR' }}/{{ composant.unite }}
              </option>
            </select>
          </label>

          <label>Quantité
            <input type="number" step="0.01" [name]="'quantite' + i" [(ngModel)]="ligne.quantiteUtilisee">
          </label>

          <button type="button" class="danger" (click)="removeLine(i)">Retirer</button>
        </div>

        <div class="actions">
          <button type="button" class="secondary" (click)="addLine()">Ajouter un composant</button>
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </section>

    <section class="card">
      <h2>Liste des créations</h2>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Composants</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let creation of creations">
            <td>{{ creation.nom }}</td>
            <td>
              <div *ngFor="let ligne of creation.composants">
                {{ ligne.composant.nom }} : {{ ligne.quantiteUtilisee }} {{ ligne.composant.unite }}
              </div>
            </td>
            <td>
              <button class="secondary" (click)="showPrice(creation)">Calculer</button>

              <div class="price-box" *ngIf="selectedPriceId === creation.id && prix">
                <div><strong>Coût total</strong><br>{{ prix.coutTotal | currency:'EUR' }}</div>
                <div><strong>Prix conseillé</strong><br>{{ prix.prixConseille | currency:'EUR' }}</div>
                <div><strong>Prix boutique</strong><br>{{ prix.prixBoutique | currency:'EUR' }}</div>
                <div><strong>Bénéfice</strong><br>{{ prix.beneficeEstime | currency:'EUR' }}</div>
              </div>
            </td>
            <td>
              <button class="danger" (click)="remove(creation)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class CreationsComponent implements OnInit {
  composants: Composant[] = [];
  creations: Creation[] = [];
  prix: PrixCreation | null = null;
  selectedPriceId: number | undefined;

  nom = '';
  heuresTravail = 0;
  tauxHoraire = 15;
  marge = 0.40;
  autresCouts = 0;

  lignes: LigneForm[] = [
    { composantId: null, quantiteUtilisee: 1 }
  ];

  constructor(
    private composantService: ComposantService,
    private creationService: CreationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.composantService.findAll().subscribe(data => this.composants = data);
    this.creationService.findAll().subscribe(data => this.creations = data);
  }

  addLine(): void {
    this.lignes.push({ composantId: null, quantiteUtilisee: 1 });
  }

  removeLine(index: number): void {
    this.lignes.splice(index, 1);
  }

  save(): void {
    const request: CreationRequest = {
      nom: this.nom,
      heuresTravail: this.heuresTravail,
      tauxHoraire: this.tauxHoraire,
      marge: this.marge,
      autresCouts: this.autresCouts,
      composants: this.lignes
        .filter(ligne => ligne.composantId !== null)
        .map(ligne => ({
          composantId: ligne.composantId as number,
          quantiteUtilisee: ligne.quantiteUtilisee
        }))
    };

    this.creationService.create(request).subscribe(() => {
      this.reset();
      this.load();
    });
  }

  showPrice(creation: Creation): void {
    if (!creation.id) return;
    this.selectedPriceId = creation.id;
    this.creationService.calculerPrix(creation.id).subscribe(data => this.prix = data);
  }

  remove(creation: Creation): void {
    if (!creation.id) return;
    this.creationService.delete(creation.id).subscribe(() => this.load());
  }

  reset(): void {
    this.nom = '';
    this.heuresTravail = 0;
    this.tauxHoraire = 15;
    this.marge = 0.40;
    this.autresCouts = 0;
    this.lignes = [{ composantId: null, quantiteUtilisee: 1 }];
  }
}
