import {NgModule} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import {LoginPanelComponent} from './login-panel/login-panel.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {RegisterPanelComponent} from "./register-panel/register-panel.component";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
  {path: 'login', component: LoginPanelComponent},
  {path: 'register', component: RegisterPanelComponent},
  {path: 'home', component: HomeComponent}

]

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [],
})
export class LoginPanelModule {
}
