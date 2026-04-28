import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vente, VenteRequest } from '../models/vente.model';

@Injectable({ providedIn: 'root' })
export class VenteService {
  private readonly apiUrl = 'http://localhost:8080/api/ventes';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.apiUrl);
  }

  create(request: VenteRequest): Observable<Vente> {
    return this.http.post<Vente>(this.apiUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
