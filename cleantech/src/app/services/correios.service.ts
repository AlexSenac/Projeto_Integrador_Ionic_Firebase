import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CorreiosService {
  constructor(private http: HttpClient) {}

  getEndereco(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${environment.correiosWS}/${cep}/json/`);
  }
}
