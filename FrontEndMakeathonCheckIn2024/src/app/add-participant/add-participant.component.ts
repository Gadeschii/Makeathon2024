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
  category: string = '';
  firstName: string = ''; 
  lastName: string = ''; 
  email: string = ''; 
  tshirtsize: string = '';
  mobileNumber: string = ''; 
  certificate: boolean = false;

  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  answer5: string = '';



  // apiUrl = 'http://localhost:3000';
  apiUrl = '/auth'; //for AWS

  // apiUrl = 'http://localhost:443';
  constructor(
    private userService:UserService, 
    private router: Router, 
    private http: HttpClient 
  ) {}

  onAddParticipant(form: any) {
    console.log(form.value);
    if (form.valid) {
      const userData = {
        Salutation: this.salutation,
        Category: this.category,
        'T-Shirt Size': this.tshirtsize,
        'First Name': this.firstName,
        'Last Name': this.lastName,
        'E-Mail': this.email,
        'Mobile Number': this.mobileNumber,
        Certificate: this.certificate,
        Question1: this.answer1,
        Question2: this.answer2,
        Question3: this.answer3,
        Question4: this.answer4,
        Question5: this.answer5,
      };
      
      this.http.post(`${this.apiUrl}/auth/addparticipant`, userData)    
            .subscribe(response => {
              console.log(response);
              this.router.navigate(['/auth/addparticipant']); // Redirige a '/addParticipant'
          }, error => {
              console.error(error);
          });
    }
    this.goBack(); // Redirige a '/auth/dashboard'
  }

  goBack() {
    this.router.navigateByUrl('/auth/dashboard');
    // this.router.navigate(['/auth/dashboard']); // Redirige a '/auth/dashboard'
  }
}