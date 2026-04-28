import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Composant, TypeComposant } from '../../models/composant.model';
import { ComposantService } from '../../services/composant.service';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-composants',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCard, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatButton],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Gestion</p>
        <h2>Composants</h2>
        <p>Gère tes tissus, boutons, fermetures et accessoires</p>
      </div>

      <button class="primary-btn">
        <span class="icon">add</span>
        Ajouter
      </button>
    </section>

    <!-- FORM -->
    <section class="card form-card">
      <h3>Ajouter un composant</h3>

      <form class="form" (ngSubmit)="save()">

        <label>
          Nom
          <input [(ngModel)]="form.nom" name="nom" placeholder="Ex : Coton fleuri">
        </label>

        <label>
          Type
          <select [(ngModel)]="form.type" name="type" (change)="onTypeChange()">
            <option value="TISSU">Tissu</option>
            <option value="MERCERIE">Mercerie</option>
            <option value="EMBALLAGE">Emballage</option>
            <option value="AUTRE">Autre</option>
          </select>
        </label>

        <label>
          Fournisseur
          <input [(ngModel)]="form.fournisseur" name="fournisseur" placeholder="Ex : Mondial Tissus">
        </label>

        <label>
          Date d'achat
          <input type="date" [(ngModel)]="form.dateAchat" name="dateAchat">
        </label>

        <label>
          Prix
          <input type="number" step="0.01" [(ngModel)]="form.prixUnitaire" name="prixUnitaire">
        </label>

        <label>
          Unité
          <select [(ngModel)]="form.unite" name="unite">
            <option value="m">mètre</option>
            <option value="unité">unité</option>
            <option value="lot">lot</option>
          </select>
        </label>

        <label>
          {{ form.unite === 'm' ? 'Métrage disponible' : 'Quantité disponible' }}
          <input type="number" step="0.01" [(ngModel)]="form.stock" name="stock">
        </label>

        <button type="submit">
          <span class="icon">add</span>
          Ajouter
        </button>

      </form>
    </section>

    <!-- LISTE -->
    <section class="card">
      <h3>Liste des composants</h3>

      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th (click)="sort('nom')">Nom ⬍</th>
            <th (click)="sort('type')">Type ⬍</th>
            <th (click)="sort('fournisseur')">Fournisseur ⬍</th>
            <th (click)="sort('dateAchat')">Date ⬍</th>
            <th (click)="sort('prixUnitaire')">Prix ⬍</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr *ngFor="let c of composants">
            <td>{{ c.nom }}</td>

            <td>
              <span class="badge">{{ c.type }}</span>
            </td>

            <td>
              {{ c.fournisseur || '-' }}
            </td>

            <td>
              {{ c.dateAchat | date:'dd/MM/yyyy' }}
            </td>

            <td>
              {{ c.prixUnitaire | number:'1.2-2' }} € / {{ c.unite }}
            </td>

            <td>
              {{ c.stock }} {{ c.unite }}
            </td>

            <td class="actions">

              <!-- MODIFIER -->
              <button class="icon-btn" (click)="edit(c)">
                <span class="icon">edit</span>
              </button>

              <!-- SUPPRIMER -->
              <button class="icon-btn danger" (click)="remove(c)">
                <span class="icon">delete</span>
              </button>

            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </section>
  `
})
export class ComposantsComponent implements OnInit {
  composants: Composant[] = [];
  types: TypeComposant[] = ['TISSU', 'MERCERIE', 'EMBALLAGE', 'AUTRE'];

  form: Composant = {
    nom: '',
    type: 'TISSU',
    prixUnitaire: 0,
    unite: 'm',
    stock: 0
  };

  constructor(private composantService: ComposantService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.composantService.findAll().subscribe(data => this.composants = data);
  }

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.composants.sort((a: any, b: any) => {
      let valueA = a[field];
      let valueB = b[field];

      if (!valueA) valueA = '';
      if (!valueB) valueB = '';

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  save(): void {
    const request = this.form.id
      ? this.composantService.update(this.form.id, this.form)
      : this.composantService.create(this.form);

    request.subscribe(() => {
      this.reset();
      this.load();
    });
  }

  edit(composant: Composant): void {
    this.form = { ...composant };
  }

  onTypeChange(): void {
    if (this.form.type === 'TISSU') {
      this.form.unite = 'm';
    } else {
      this.form.unite = 'unité';
    }
  }

  remove(composant: Composant): void {
    if (!composant.id) return;
    this.composantService.delete(composant.id).subscribe(() => this.load());
  }

  reset(): void {
    this.form = {
      nom: '',
      type: 'TISSU',
      prixUnitaire: 0,
      unite: 'm',
      stock: 0
    };
  }

}
