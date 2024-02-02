
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../Service/user.service'; 
import { AuthRoutingModule } from './auth.routing.module';



@NgModule({
    declarations: [
        // LoginComponent,
        // RegisterComponent
     
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AuthRoutingModule
    ],
    
    providers: [UserService],

})
export class AuthModule { 

}
