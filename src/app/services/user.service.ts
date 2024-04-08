import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http = inject(HttpClient)
  private myAppUrl: string = 'https://mgasapp-backend.up.railway.app/'
  private myApiUrl: string ='api/users'
  //constructor(private _http: HttpClient) { }

  signIn(user: User): Observable<any> {
    return this._http.post(`${this.myAppUrl}${this.myApiUrl}/new`, user)
  }

  login(user: User): Observable<string> {
    return this._http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }

}
