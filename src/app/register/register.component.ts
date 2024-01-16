import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { IUser } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  name: string = ''; // Initialize email property
  password: string = ''; // Initialize password property
  confirmPassword: string = ''; // Initialize confirmPassword property
 
  constructor(private userService:UserService, private router: Router ) {}

  onRegister(form: any):void {
    // Check if password and confirmPassword match
    if (this.password !== this.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    // Create user object from email and password
    const user: IUser = {
      name: this.name,
      password: this.password
    };

    // Register user
    this.userService.register(user).subscribe(
      (res) => {

        // Store name and password in local storage
        localStorage.setItem('name', user.name);
        localStorage.setItem('password', user.password);

        // Redirect to home page
        this.router.navigateByUrl('/auth'); //redirect to Database header, body...

      },
      (err) => {
        alert('An error has occurred while registering.');
      }
    );
  }
}