import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Creation } from '../../models/creation.model';
import { Vente, VenteRequest } from '../../models/vente.model';
import { CreationService } from '../../services/creation.service';
import { VenteService } from '../../services/vente.service';

@Component({
  selector: 'app-ventes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="page-title">Ventes</h1>

    <section class="card">
      <h2>Ajouter une vente</h2>
      <form class="form" (ngSubmit)="save()">
        <label>Création
          <select name="creationId" [(ngModel)]="form.creationId">
            <option [ngValue]="null">Choisir</option>
            <option *ngFor="let creation of creations" [ngValue]="creation.id">
              {{ creation.nom }}
            </option>
          </select>
        </label>

        <label>Prix vendu
          <input type="number" step="0.01" name="prixVendu" [(ngModel)]="form.prixVendu">
        </label>

        <label>Date
          <input type="date" name="dateVente" [(ngModel)]="form.dateVente">
        </label>

        <label>Canal
          <select name="canal" [(ngModel)]="form.canal">
            <option>Instagram</option>
            <option>Etsy</option>
            <option>Marché</option>
            <option>Commande directe</option>
            <option>Boutique</option>
            <option>Autre</option>
          </select>
        </label>

        <label>Client
          <input name="client" [(ngModel)]="form.client">
        </label>

        <label>&nbsp;
          <button type="submit">Ajouter</button>
        </label>
      </form>
    </section>

    <section class="card">
      <h2>Historique</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Création</th>
            <th>Prix vendu</th>
            <th>Canal</th>
            <th>Client</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let vente of ventes">
            <td>{{ vente.dateVente | date:'dd/MM/yyyy' }}</td>
            <td>{{ vente.creation.nom }}</td>
            <td>{{ vente.prixVendu | currency:'EUR' }}</td>
            <td>{{ vente.canal }}</td>
            <td>{{ vente.client }}</td>
            <td><button class="danger" (click)="remove(vente)">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class VentesComponent implements OnInit {
  ventes: Vente[] = [];
  creations: Creation[] = [];

  form: VenteRequest = {
    creationId: 0,
    prixVendu: 0,
    dateVente: new Date().toISOString().substring(0, 10),
    canal: 'Instagram',
    client: ''
  };

  constructor(
    private venteService: VenteService,
    private creationService: CreationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.venteService.findAll().subscribe(data => this.ventes = data);
    this.creationService.findAll().subscribe(data => this.creations = data);
  }

  save(): void {
    if (!this.form.creationId) return;
    this.venteService.create(this.form).subscribe(() => {
      this.form = {
        creationId: 0,
        prixVendu: 0,
        dateVente: new Date().toISOString().substring(0, 10),
        canal: 'Instagram',
        client: ''
      };
      this.load();
    });
  }

  remove(vente: Vente): void {
    if (!vente.id) return;
    this.venteService.delete(vente.id).subscribe(() => this.load());
  }
}
