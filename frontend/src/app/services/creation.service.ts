import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Creation, CreationRequest, PrixCreation } from '../models/creation.model';

@Injectable({ providedIn: 'root' })
export class CreationService {
  private readonly apiUrl = 'http://localhost:8080/api/creations';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Creation[]> {
    return this.http.get<Creation[]>(this.apiUrl);
  }

  create(request: CreationRequest): Observable<Creation> {
    return this.http.post<Creation>(this.apiUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  calculerPrix(id: number): Observable<PrixCreation> {
    return this.http.get<PrixCreation>(`${this.apiUrl}/${id}/prix`);
  }

  createWithImage(formData: FormData): Observable<Creation> {
    return this.http.post<Creation>(`${this.apiUrl}/with-image`, formData);
  }


}
