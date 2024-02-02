// Importing necessary modules
import { NgModule } from '@angular/core'; // Angular's core NgModule
import { RouterModule, Routes } from '@angular/router'; // Angular's RouterModule and Routes for routing

// Defining routes for the application
const routes: Routes = [
  { path: '', redirectTo:'auth/login', pathMatch:'full' }, // Default route redirects to 'auth/login'
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Lazy loading AuthModule when 'auth' path is hit
];

// NgModule decorator with its metadata
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuring the router module with application routes
  exports: [RouterModule] // Exporting RouterModule to make router directives available for use in the rest of the app
})
// AppRoutingModule class declaration
export class AppRoutingModule { 
  
}