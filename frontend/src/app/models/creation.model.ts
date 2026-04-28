import { Composant } from './composant.model';

export interface CreationComposant {
  id?: number;
  composant: Composant;
  quantiteUtilisee: number;
}

export interface Creation {
  id?: number;
  nom: string;
  heuresTravail: number;
  tauxHoraire: number;
  marge: number;
  autresCouts: number;
  dateCreation?: string;
  composants: CreationComposant[];
}

export interface CreationRequest {
  nom: string;
  heuresTravail: number;
  tauxHoraire: number;
  marge: number;
  autresCouts: number;
  composants: {
    composantId: number;
    quantiteUtilisee: number;
  }[];
}

export interface PrixCreation {
  coutComposants: number;
  coutMainOeuvre: number;
  coutTotal: number;
  prixConseille: number;
  prixBoutique: number;
  beneficeEstime: number;
  rentabilite: number;
}
