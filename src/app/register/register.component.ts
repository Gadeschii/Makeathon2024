import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = ''; // Initialize email property
  password: string = ''; // Initialize password property
  confirmPassword: string = ''; // Initialize confirmPassword property
 

  constructor() {}

  register() {
    console.log(this.email);
    console.log(this.password);
  }
}