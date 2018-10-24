import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor(private http: HttpClient) {}

  public getCations() {
    return this.http.get('http://localhost:4000/cations');

  }

  public getAnions() {
    return this.http.get('http://localhost:4000/anions');
  }
}
