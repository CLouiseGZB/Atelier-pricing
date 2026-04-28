import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { DashboardComponent } from './app/pages/dashboard/dashboard.component';
import { ComposantsComponent } from './app/pages/composants/composants.component';
import { CreationsComponent } from './app/pages/creations/creations.component';
import { VentesComponent } from './app/pages/ventes/ventes.component';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <div class="app-shell">

      <!-- SIDEBAR -->
      <aside class="sidebar">

        <div class="brand-card">
          <div class="logo-icon">✂</div>
          <div>
            <strong>Atelier Pricing</strong>
            <span>Créations couture</span>
          </div>
        </div>

        <nav class="side-nav">

          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <span class="nav-icon">
          <span class="icon">dashboard</span>
        </span>
            Dashboard
          </a>

          <a routerLink="/composants" routerLinkActive="active">
        <span class="nav-icon">
          <span class="icon">inventory_2</span>
        </span>
            Composants
          </a>

          <a routerLink="/creations" routerLinkActive="active">
        <span class="nav-icon">
          <span class="icon">checkroom</span>
        </span>
            Créations
          </a>

          <a routerLink="/ventes" routerLinkActive="active">
        <span class="nav-icon">
          <span class="icon">payments</span>
        </span>
            Ventes
          </a>

        </nav>

        <div class="premium-note">
          <span class="icon">auto_awesome</span>
          <div>
            <strong>Mode boutique</strong>
            <small>Prix, marge & ventes</small>
          </div>
        </div>

      </aside>

      <!-- CONTENT -->
      <section class="content">

        <header class="topbar">

          <div>
            <p class="hello">Bonjour Louisiane</p>
            <h1>Gestion de ton atelier</h1>
          </div>

          <div class="top-actions">
            <button class="ghost-btn">
              <span class="icon">notifications</span>
            </button>
            <div class="avatar">L</div>
          </div>

        </header>

        <main>
          <router-outlet></router-outlet>
        </main>

      </section>

    </div>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: DashboardComponent },
      { path: 'composants', component: ComposantsComponent },
      { path: 'creations', component: CreationsComponent },
      { path: 'ventes', component: VentesComponent }
    ])
  ]
}).catch(err => console.error(err));