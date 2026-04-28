import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Composant, TypeComposant } from '../../models/composant.model';
import { ComposantService } from '../../services/composant.service';

import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-composants',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Gestion</p>
        <h2>Composants</h2>
        <p>Gère tes tissus, boutons, fermetures et accessoires</p>
      </div>
    </section>

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
          Prix payé (€)
          <input type="number" step="0.01" [(ngModel)]="form.prixAchatTotal" name="prixAchatTotal">
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
            <th (click)="sort('prixAchatTotal')">Prix payé ⬍</th>
            <th (click)="sort('prixUnitaire')">Prix unitaire ⬍</th>
            <th (click)="sort('stock')">Quantité ⬍</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
          <tr *ngFor="let c of composants">

            <td>{{ c.nom }}</td>

            <td><span class="badge">{{ c.type }}</span></td>

            <td>{{ c.fournisseur || '-' }}</td>

            <td>
              {{ c.dateAchat ? (c.dateAchat | date:'dd/MM/yyyy') : '-' }}
            </td>

            <!-- 👇 ICI -->
            <td>
              {{ c.prixAchatTotal != null
                ? (c.prixAchatTotal | number:'1.2-2') + ' €'
                : '-' }}
            </td>

            <td>
              {{ c.prixUnitaire != null
                ? (c.prixUnitaire | number:'1.2-2')
                : '-' }}
              <span class="muted">/ {{ c.unite }}</span>
            </td>

            <td>{{ c.stock ?? '-' }} {{ c.unite }}</td>

            <td class="actions">
              <button class="icon-btn" (click)="edit(c)">
                <span class="icon">edit</span>
              </button>
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

  lastCreatedId?: number;

  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  form: Composant = this.getEmptyForm();

  constructor(
      private composantService: ComposantService,
      private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.composantService.findAll().subscribe(data => {
      this.composants = data;
    });
  }

  save(): void {
    const request = this.form.id
        ? this.composantService.update(this.form.id, this.form)
        : this.composantService.create(this.form);

    request.subscribe(created => {
      this.lastCreatedId = created.id;
      this.reset();
      this.load();

      setTimeout(() => this.scrollToNew(), 300);
    });
  }

  edit(c: Composant): void {
    const dialogRef = this.dialog.open(EditComposantDialog, {
      width: '460px',
      data: { ...c }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !c.id) return;

      this.composantService.update(c.id, result).subscribe(() => {
        this.load();
      });
    });
  }

  remove(c: Composant): void {
    if (!c.id) return;

    if (confirm(`Supprimer "${c.nom}" ?`)) {
      this.composantService.delete(c.id).subscribe(() => {
        this.load();
      });
    }
  }

  onTypeChange(): void {
    this.form.unite = this.form.type === 'TISSU' ? 'm' : 'unité';
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.composants.sort((a: any, b: any) => {
      let valueA = a[field] ?? '';
      let valueB = b[field] ?? '';

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  scrollToNew(): void {
    if (!this.lastCreatedId) return;

    const element = document.getElementById('row-' + this.lastCreatedId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  reset(): void {
    this.form = this.getEmptyForm();
  }

  private getEmptyForm(): Composant {
    return {
      nom: '',
      type: 'TISSU',
      prixUnitaire: 0,
      prixAchatTotal: 0,
      unite: 'm',
      stock: 0,
      dateAchat: '',
      fournisseur: ''
    };
  }
}

@Component({
  selector: 'app-edit-composant-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dialog-box">
      <h2>Modifier le composant</h2>

      <label>
        Nom
        <input [(ngModel)]="data.nom" name="nom">
      </label>

      <label>
        Type
        <select [(ngModel)]="data.type" name="type" (change)="onTypeChange()">
          <option value="TISSU">Tissu</option>
          <option value="MERCERIE">Mercerie</option>
          <option value="EMBALLAGE">Emballage</option>
          <option value="AUTRE">Autre</option>
        </select>
      </label>

      <label>
        Fournisseur
        <input [(ngModel)]="data.fournisseur" name="fournisseur">
      </label>

      <label>
        Date d'achat
        <input type="date" [(ngModel)]="data.dateAchat" name="dateAchat">
      </label>

      <label>
        Prix payé (€)
        <input type="number" step="0.01" [(ngModel)]="data.prixAchatTotal" name="prixAchatTotal">
      </label>

      <label>
        Unité
        <select [(ngModel)]="data.unite" name="unite">
          <option value="m">mètre</option>
          <option value="unité">unité</option>
          <option value="lot">lot</option>
        </select>
      </label>

      <label>
        Quantité / métrage
        <input type="number" step="0.01" [(ngModel)]="data.stock" name="stock">
      </label>

      <div class="dialog-actions">
        <button type="button" class="secondary" (click)="close()">Annuler</button>
        <button type="button" (click)="save()">Valider</button>
      </div>
    </div>
  `
})
export class EditComposantDialog {
  constructor(
      public dialogRef: MatDialogRef<EditComposantDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Composant
  ) {}

  onTypeChange(): void {
    this.data.unite = this.data.type === 'TISSU' ? 'm' : 'unité';
  }

  save(): void {
    this.dialogRef.close(this.data);
  }

  close(): void {
    this.dialogRef.close();
  }
}