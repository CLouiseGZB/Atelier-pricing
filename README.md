# 🧵 Atelier Pricing

---

## 🏢 Contexte

**Atelier Pricing** est une application destinée aux créateurs textile (couture, accessoires, mode).  
Le projet consiste en une application permettant de **gérer ses composants et calculer automatiquement le prix de ses créations avec un rendu visuel et un calcul dynamique en temps réel.**

---

## 🎯 Objectifs

- Gérer ses composants (tissus, mercerie…)
- Créer des produits avec plusieurs composants
- Calculer automatiquement :
  - coût des matériaux
  - coût de main d’œuvre
  - prix conseillé
- Ajouter une image à une création
- Afficher les créations sous forme de cartes modernes

---

## 🚀 Démarrage

### 🔧 Pré-requis
- Java 17+
- Maven
- Node.js
- Angular CLI
- MySQL (ou H2)

### ▶️ Lancement

**Backend**
```bash
mvn clean install
mvn spring-boot:run

**Frontend**

npm install
ng serve

Accès :

http://localhost:4200
🧱 **Technologies**
Frontend
Angular (standalone)
TypeScript
HTML
CSS
Backend
Java
Spring Boot
Spring Data JPA
Hibernate
Base de données
MySQL

📁 **Structure**
ATELIER-PRICING
├─ backend
│  ├─ controller
│  ├─ service
│  ├─ repository
│  ├─ entity
│  └─ resources
│
├─ frontend
│  ├─ app
│  │  ├─ pages
│  │  │  ├─ composants
│  │  │  └─ creations
│  │  ├─ models
│  │  ├─ services
│  │  └─ shared
│  └─ styles.css

Charte graphique
Couleurs
Primary: #7c3aed
Secondary: #ec4899
Background: #f8fafc
Border: #e7defc
Typographie
Inter
Roboto
🧩 Fonctionnalités
🧵 Gestion des composants
Ajout / modification / suppression
Types : TISSU, MERCERIE, EMBALLAGE, AUTRE
Champs :
nom
fournisseur
date d’achat
prix d’achat
prix unitaire (calculé)
quantité / métrage
🪡 Création de produits
Nom de la création
Ajout de plusieurs composants
Quantité utilisée (mètre ou unité dynamique)
Upload d’image depuis l’ordinateur
Preview immédiate
💰 Calcul dynamique

Coût composants

prixUnitaire × quantité

Main d’œuvre

heuresTravail × tauxHoraire

Coût total

coût composants + main d’œuvre + autres coûts

Prix conseillé

coût total × (1 + marge)
📊 Calcul en temps réel
Coût par ligne
Total dynamique
Prix conseillé affiché instantanément
🖼 Gestion des images
Upload depuis l’ordinateur
Preview avant enregistrement
Affichage dans les cartes de création
🧾 Affichage des créations
Cartes visuelles
Image + nom
Liste des composants
Calcul du prix
Suppression
🔄 Workflow
Créer composant → créer création → ajouter composants → calcul → affichage carte
⚙️ Configuration importante
spring.jpa.hibernate.ddl-auto=update

⚠️ Ne pas utiliser create sinon la base de données est recréée à chaque lancement

💡 UX
Design moderne (glassmorphism)
Responsive mobile
Navigation fluide
Feedback visuel (hover, focus)
Calcul instantané
🚧 Améliorations possibles
Drag & drop image
Upload cloud (Cloudinary)
Édition de création (popup)
Export PDF (devis)
Gestion automatique du stock
Dashboard statistiques
🧪 Statut
✔ CRUD composants
✔ CRUD créations
✔ Calcul dynamique
✔ Upload image
✔ UI responsive

🚧 En cours :

optimisation UX
édition avancée
💎 Vision

Créer une application inspirée de :

Shopify (pricing)
Notion (UX)
Vinted (images)

pour aider les créateurs indépendants à mieux gérer leurs coûts et leurs prix.
