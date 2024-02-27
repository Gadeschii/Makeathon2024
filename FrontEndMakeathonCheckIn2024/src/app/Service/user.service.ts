// Import necessary modules and interfaces
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
// UserService class
export class UserService {
  // Define the API URL
  // readonly apiUrl = 'http://localhost:3000';
  readonly apiUrl = '/auth'; //for AWS
  
  // readonly apiUrl = 'http://10.10.217.198:3000';
  // readonly apiUrl = 'https://192.168.1.125:3000';
  //  readonly apiUrl = 'https://192.168.1.125:443';

  AUTH_SERVER: string = this.apiUrl;
  // readonly apiUrl = 'https://gadeschii.github.io/Makeathon2024/';
  // readonly ServerIP = '192.168.1.125'; 
  // readonly ServerIP = '10.10.217.198';

  // readonly AUTH_SERVER = `https://${this.ServerIP}:3000`;
  // readonly AUTH_SERVER = `https://${this.ServerIP}:443`;
  


  // Create a new BehaviorSubject that will hold a boolean value
  authSubject = new BehaviorSubject(false);
  // Declare a private token variable
  private token!: string;
  // Inject HttpClient into the constructor
  constructor(private httpClient: HttpClient) { }

  // Autenticar con el servidor NodeJS
  // Method to register a new credentials.
  register(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: IJwtResponse) => {
          if (res) {
            // Save the token if the response is successful
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        }
      ));
  }

  // Method to log in a user
  login(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/login`, 
      user).pipe(tap(
        (res: IJwtResponse) => {
          if (res) {
            // Save the token if the response is successful
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        }
      ));
  }

  // Method to log out a user
  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  // Method to save the token in local storage
  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  // Method to get the token from local storage
   getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token;
  }

  // Method to check if the user is authenticated
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

  // Method to export participants to Excel
  exportToExcel() {
    this.getAllParticipants().subscribe(participants => {
      const worksheet = XLSX.utils.json_to_sheet(participants);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
      XLSX.writeFile(workbook, 'participants.xlsx');
    });
  }

  //Method to export the E-mail of participants to Certificate value == 1
  exportCertificate() {
    this.getAllParticipants().subscribe(participants => {
      const certificateParticipants = participants.filter(participant => participant.Certificate === 1)
        .map(participant => ({
          Satulutation: participant.Satulutation,
          Category: participant.Category,
          'First Name': participant['First Name'],
          'Last Name': participant['Last Name'],
          'E-Mail': participant['E-Mail'],
          Country: participant['Country'],
          Status: participant.Status,
          'University I Institution I Company': participant['University I Institution I Company'],
          'T-Shirt Size': participant['T-Shirt Size'],
          'Mobile Number': participant['Mobile Number'],
          CheckIn: participant.CheckIn,
          Certificate: participant.Certificate
        }));
      const worksheet = XLSX.utils.json_to_sheet(certificateParticipants);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Certificate Participants');
      XLSX.writeFile(workbook, 'certificateParticipants.xlsx');
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