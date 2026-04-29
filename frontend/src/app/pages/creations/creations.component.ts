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
    <section class="creations-page">

      <section class="page-header">
        <div>
          <p class="eyebrow">Atelier</p>
          <h2>Créations</h2>
          <p>Calcule le coût réel et le prix conseillé</p>
        </div>
      </section>

      <section class="card form-card">
        <h3>Nouvelle création</h3>

        <form (ngSubmit)="save()">
          <div class="form">
            <label>
              Nom
              <input [(ngModel)]="nom" name="nom" required>
            </label>

            <label>
              Heures
              <input type="number" step="0.01" [(ngModel)]="heuresTravail" name="heuresTravail">
            </label>

            <label>
              Taux €/h
              <input type="number" step="0.01" [(ngModel)]="tauxHoraire" name="tauxHoraire">
            </label>

            <label>
              Marge
              <input type="number" step="0.01" [(ngModel)]="marge" name="marge">
            </label>

            <label>
              Autres coûts
              <input type="number" step="0.01" [(ngModel)]="autresCouts" name="autresCouts">
            </label>

            <label class="file-upload">

              <input
                  type="file"
                  (change)="onFileSelected($event)"
                  accept="image/*"
                  hidden
                  #fileInput
              >

              <button type="button" class="upload-btn" (click)="fileInput.click()">
                <span class="icon">upload</span>
                Choisir une image
              </button>

            </label>

            <!-- PREVIEW -->
            <div *ngIf="imagePreview" class="image-preview">
              <img [src]="imagePreview" alt="preview">
            </div>
          </div>

          <h3>Composants</h3>

          <div class="creation-lines">
            <div *ngFor="let ligne of lignes; let i = index" class="creation-line">

              <label>
                Composant
                <select [(ngModel)]="ligne.composantId" [name]="'comp' + i">
                  <option [ngValue]="null">Choisir</option>
                  <option *ngFor="let c of composants" [ngValue]="c.id">
                    {{ c.nom }} — {{ c.prixUnitaire | number:'1.2-2' }}€/{{ c.unite }}
                  </option>
                </select>
              </label>

              <label>
                {{ getUnite(ligne) === 'm' ? 'Métrage utilisé' : 'Quantité utilisée' }}
                <input
                    type="number"
                    step="0.01"
                    [(ngModel)]="ligne.quantiteUtilisee"
                    [name]="'qte' + i"
                >
              </label>

              <div class="line-cost">
                <span>Coût</span>
                <strong>{{ getCoutLigne(ligne) | currency:'EUR' }}</strong>
              </div>

              <button type="button" class="icon-btn danger" (click)="removeLine(i)">
                <span class="icon">delete</span>
              </button>

            </div>
          </div>

          <button type="button" class="secondary" (click)="addLine()">
            <span class="icon">add</span>
            Ajouter un composant
          </button>

          <div class="live-summary">
            <div>
              <span>Composants</span>
              <strong>{{ getCoutComposantsLive() | currency:'EUR' }}</strong>
            </div>

            <div>
              <span>Main d’œuvre</span>
              <strong>{{ getMainOeuvreLive() | currency:'EUR' }}</strong>
            </div>

            <div>
              <span>Coût total</span>
              <strong>{{ getCoutTotalLive() | currency:'EUR' }}</strong>
            </div>

            <div class="highlight-price">
              <span>Prix conseillé</span>
              <strong>{{ getPrixConseilleLive() | currency:'EUR' }}</strong>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="secondary" (click)="reset()">Annuler</button>

            <button type="button" (click)="save()">
              <span class="icon">save</span>
              Enregistrer
            </button>
          </div>
        </form>
      </section>

      <section class="card">
        <div class="section-title">
          <div>
            <h3>Liste des créations</h3>
            <p>Tes pièces enregistrées avec leurs composants.</p>
          </div>
        </div>

        <div class="creation-cards">
          <article class="creation-card" *ngFor="let creation of creations">

            <div class="creation-image" *ngIf="creation.photoUrl; else noImage">
              <img [src]="creation.photoUrl" [alt]="creation.nom">
            </div>

            <ng-template #noImage>
              <div class="creation-image empty">
                <span class="icon">checkroom</span>
              </div>
            </ng-template>

            <div class="creation-card-content">
              <h3>{{ creation.nom }}</h3>

              <div class="component-list">
                <span *ngFor="let ligne of creation.composants" class="component-pill">
                  {{ ligne.composant.nom }} :
                  {{ ligne.quantiteUtilisee }}
                  {{ ligne.composant.unite }}
                </span>
              </div>

              <div class="actions">
                <button class="secondary" (click)="showPrice(creation)">
                  <span class="icon">calculate</span>
                  Calculer
                </button>

                <button class="icon-btn danger" (click)="remove(creation)">
                  <span class="icon">delete</span>
                </button>
              </div>

              <div class="price-box compact" *ngIf="selectedPriceId === creation.id && prix">
                <div>
                  <span>Coût total</span>
                  <strong>{{ prix.coutTotal | currency:'EUR' }}</strong>
                </div>

                <div>
                  <span>Prix conseillé</span>
                  <strong>{{ prix.prixConseille | currency:'EUR' }}</strong>
                </div>

                <div>
                  <span>Prix boutique</span>
                  <strong>{{ prix.prixBoutique | currency:'EUR' }}</strong>
                </div>

                <div>
                  <span>Bénéfice</span>
                  <strong>{{ prix.beneficeEstime | currency:'EUR' }}</strong>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>

    </section>
  `
})
export class CreationsComponent implements OnInit {
  composants: Composant[] = [];
  creations: Creation[] = [];

  prix: PrixCreation | null = null;
  selectedPriceId?: number;

  nom = '';
  heuresTravail = 0;
  tauxHoraire = 15;
  marge = 0.4;
  autresCouts = 0;
  selectedFile?: File;
  imagePreview: string | null = null;
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
    if (this.lignes.length > 1) {
      this.lignes.splice(index, 1);
    }
  }

  getComposant(ligne: LigneForm): Composant | undefined {
    return this.composants.find(c => c.id === ligne.composantId);
  }

  getUnite(ligne: LigneForm): string {
    return this.getComposant(ligne)?.unite || '';
  }

  getCoutLigne(ligne: LigneForm): number {
    const composant = this.getComposant(ligne);
    if (!composant) return 0;

    return Number(composant.prixUnitaire || 0) * Number(ligne.quantiteUtilisee || 0);
  }

  getCoutComposantsLive(): number {
    return this.lignes.reduce((total, ligne) => total + this.getCoutLigne(ligne), 0);
  }

  getMainOeuvreLive(): number {
    return Number(this.heuresTravail || 0) * Number(this.tauxHoraire || 0);
  }

  getCoutTotalLive(): number {
    return this.getCoutComposantsLive()
        + this.getMainOeuvreLive()
        + Number(this.autresCouts || 0);
  }

  getPrixConseilleLive(): number {
    return this.getCoutTotalLive() * (1 + Number(this.marge || 0));
  }

  save(): void {
    console.log('BOUTON ENREGISTRER CLIQUÉ');
    const formData = new FormData();

    formData.append('nom', this.nom);
    formData.append('heuresTravail', String(this.heuresTravail));
    formData.append('tauxHoraire', String(this.tauxHoraire));
    formData.append('marge', String(this.marge));
    formData.append('autresCouts', String(this.autresCouts));

    formData.append('composants', JSON.stringify(
        this.lignes
            .filter(ligne => ligne.composantId !== null)
            .map(ligne => ({
              composantId: ligne.composantId,
              quantiteUtilisee: ligne.quantiteUtilisee
            }))
    ));

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.creationService.createWithImage(formData).subscribe(() => {
      this.reset();
      this.load();
    });
  }

  showPrice(creation: Creation): void {
    if (!creation.id) return;

    this.selectedPriceId = creation.id;
    this.creationService.calculerPrix(creation.id).subscribe(data => {
      this.prix = data;
    });
  }

  remove(creation: Creation): void {
    if (!creation.id) return;

    if (confirm(`Supprimer "${creation.nom}" ?`)) {
      this.creationService.delete(creation.id).subscribe(() => {
        this.load();
      });
    }
  }

  reset(): void {
    this.nom = '';
    this.heuresTravail = 0;
    this.tauxHoraire = 15;
    this.marge = 0.4;
    this.autresCouts = 0;
    this.selectedFile = undefined;
    this.imagePreview = null;
    this.lignes = [{ composantId: null, quantiteUtilisee: 1 }];
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    // preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}