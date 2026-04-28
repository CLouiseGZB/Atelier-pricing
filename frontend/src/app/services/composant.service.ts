import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Composant } from '../models/composant.model';

@Injectable({ providedIn: 'root' })
export class ComposantService {
  private readonly apiUrl = 'http://localhost:8080/api/composants';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Composant[]> {
    return this.http.get<Composant[]>(this.apiUrl);
  }

  create(composant: Composant): Observable<Composant> {
    return this.http.post<Composant>(this.apiUrl, composant);
  }

  update(id: number, composant: Composant): Observable<Composant> {
    return this.http.put<Composant>(`${this.apiUrl}/${id}`, composant);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
