import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http = inject(HttpClient)
  private myAppUrl: string = 'https://mgasapp-backend.up.railway.app/'
  private myApiUrl: string = 'api/products'
  constructor() { }

  getProductos(): Observable<Product[]> {
   // const token =  localStorage.getItem('token')  // 'token' fue nombrado en el backend
   // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
   // return this._http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`,{headers: headers})

   return this._http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
