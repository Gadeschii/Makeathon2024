import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const appRoutes = [
  { path: "", component: AppComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
];
export const routing = RouterModule.forRoot(appRoutes);