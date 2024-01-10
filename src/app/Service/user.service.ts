// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { IJwtResponse } from '../models/jwt.response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  
  private token!: string ; 

  constructor(private httpClient: HttpClient) { }

  // Autenticar con el servidor NodeJS
  register(user: IUser): Observable<IJwtResponse> {
    
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: IJwtResponse) => {
          if (res) {
            // saves token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        }
      ));
  }
  login(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: IJwtResponse) => {
          if (res) {
            // saves token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        }
      ));
  }
  logout(): void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token:string , expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }
  
  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token;
  }


}