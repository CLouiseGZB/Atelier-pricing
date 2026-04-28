export type TypeComposant = 'TISSU' | 'MERCERIE' | 'EMBALLAGE' | 'AUTRE';

export interface Composant {
  id?: number;
  dateAchat?: string;
  nom: string;
  type: TypeComposant;
  prixUnitaire: number;
  unite: string;
  stock: number;
  fournisseur?: string;
}
