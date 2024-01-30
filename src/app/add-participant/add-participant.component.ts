import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent {
  salutation: string = ''; 
  firstName: string = ''; 
  lastName: string = ''; 
  email: string = ''; 
  mobileNumber: string = ''; 
  apiUrl = 'http://localhost:3000';

  constructor(
    private userService:UserService, 
    private router: Router, 
    private http: HttpClient 
  ) {}

  onAddParticipant(form: any) {
    console.log(form.value);
    if (form.valid) {
      const userData = {
          salutation: this.salutation,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          mobileNumber: this.mobileNumber
      };

      this.http.post(`${this.apiUrl}/auth/addparticipant`, userData)    
            .subscribe(response => {
              console.log(response);
              this.router.navigate(['/auth/addparticipant']); // Redirige a '/addParticipant'
          }, error => {
              console.error(error);
          });
    }
  }

  goBack() {
    this.router.navigateByUrl('/auth/dashboard');
    // this.router.navigate(['/auth/dashboard']); // Redirige a '/auth/dashboard'
  }
}