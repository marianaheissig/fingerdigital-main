import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000'
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUser(email: string, password: string):Observable<any>{
    //define a rota entrando no controler  user procurando o login
    const urlGet = `${this.baseUrl}/users/login`; 
    return this.http.post(urlGet, {email, password});
  }
  
  createUser(user: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser(id: number, user: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
