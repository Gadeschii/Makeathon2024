// Importing necessary modules and services
import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit from Angular core
import { UserService } from '../Service/user.service'; // Importing UserService
import { Router } from '@angular/router'; // Importing Router for navigation
import { IUser } from '../models/user'; // Importing IUser interface

// Component metadata
@Component({
  selector: 'app-login', // The name of the HTML tag where this component will be displayed
  templateUrl: './login.component.html', // The location of the component's template
  styleUrls: ['./login.component.css'] // The location of the component's private CSS styles
})

// LoginComponent class with OnInit
export class LoginComponent implements OnInit {
  name: string = ''; // Property for name
  password: string  = ''; // Property for password

  // Constructor with UserService and Router injected
  constructor(private authService: UserService, private router: Router) { }

  // ngOnInit lifecycle hook
  ngOnInit() {
  }

  // Method to handle login
  onLogin(form: any): void {
    console.log(form.value); // Printing the form value on console 
    // Calling the login method of authService and passing the user object to it
    this.authService.login(form.value).subscribe({
      next: res => {
        this.router.navigateByUrl('/auth/dashboard');
      },
      error: err => {
        console.log(err);
        // Here you can add more code to handle the error, like showing a message to the user
      }
    });
  }
}