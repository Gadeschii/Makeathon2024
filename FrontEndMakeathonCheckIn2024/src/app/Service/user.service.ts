// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { IJwtResponse } from '../models/jwt.response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly apiUrl = 'http://localhost:3000';
   AUTH_SERVER: string = this.apiUrl;
  // readonly apiUrl = 'https://gadeschii.github.io/Makeathon2024/';
  // readonly RaspberryPiIP = '10.10.217.150';
  // readonly AUTH_SERVER = `http://${this.RaspberryPiIP}:3000`;
  authSubject = new BehaviorSubject(false);
  private token!: string;
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

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.AUTH_SERVER}/users`);
  }


  getAllParticipants(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/participants`);
  }

  exportToExcel() {
    this.getAllParticipants().subscribe(participants => {
      const worksheet = XLSX.utils.json_to_sheet(participants);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
      XLSX.writeFile(workbook, 'participants.xlsx');
    });
  }


  getTotalParticipants(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/participants`);
  }

  getCheckedInParticipantsCount(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/participants`);
  }

  getParticipantCountriesCount(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/participants`);
  }

}