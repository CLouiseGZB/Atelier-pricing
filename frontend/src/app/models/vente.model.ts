import { Creation } from './creation.model';

export interface Vente {
  id?: number;
  creation: Creation;
  prixVendu: number;
  dateVente: string;
  canal: string;
  client: string;
}

export interface VenteRequest {
  creationId: number;
  prixVendu: number;
  dateVente: string;
  canal: string;
  client: string;
}
