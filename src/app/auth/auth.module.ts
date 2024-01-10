
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../Service/user.service'; 

@NgModule({
    declarations: [
        // LoginComponent,
        // RegisterComponent
    ],
    imports: [],
    providers: [UserService],

})
export class AuthModule { 

}
