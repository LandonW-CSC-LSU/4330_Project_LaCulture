import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private apiUrl = 'http://localhost:5189/home';

  constructor(private http: HttpClient) {}

  getHomeMessage(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}