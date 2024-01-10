
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
import { IUser } from '../models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string = '';
  password: string  = '';

  constructor(private authService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: any): void {
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth'); //redirect to auth
      });
    }
}