import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Creation } from '../../models/creation.model';
import { Vente } from '../../models/vente.model';
import { CreationService } from '../../services/creation.service';
import { VenteService } from '../../services/vente.service';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCard],
  template: `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">Vue d’ensemble</p>
        <h2>Dashboard</h2>
        <p>Suis tes créations, tes ventes et la rentabilité de ton atelier.</p>
      </div>
    </section>

    <section class="stats-grid">
      <article class="stat-card">
        <div class="stat-icon">
          <span class="icon">trending_up</span>
        </div>
        <div>
          <p>Chiffre d'affaires</p>
          <strong>{{ totalVentes | currency:'EUR' }}</strong>
          <small>Total des ventes enregistrées</small>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon">
          <span class="icon">checkroom</span>
        </div>
        <div>
          <p>Créations</p>
          <strong>{{ creations.length }}</strong>
          <small>Produits créés</small>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon">
          <span class="icon">payments</span>
        </div>
        <div>
          <p>Ventes</p>
          <strong>{{ ventes.length }}</strong>
          <small>Ventes suivies</small>
        </div>
      </article>
    </section>

    <section class="card dashboard-card">
      <h2>Résumé de l’atelier</h2>
      <p class="muted">
        Ajoute tes composants, crée tes produits, puis enregistre tes ventes pour suivre ton activité.
      </p>
    </section>
  `
})
export class DashboardComponent implements OnInit {
  creations: Creation[] = [];
  ventes: Vente[] = [];
  totalVentes = 0;

  constructor(
    private creationService: CreationService,
    private venteService: VenteService
  ) {}

  ngOnInit(): void {
    this.creationService.findAll().subscribe(data => this.creations = data);
    this.venteService.findAll().subscribe(data => {
      this.ventes = data;
      this.totalVentes = data.reduce((sum, vente) => sum + Number(vente.prixVendu || 0), 0);
    });
  }
}
