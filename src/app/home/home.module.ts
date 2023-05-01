import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {LoginPanelComponent} from "../landing/login-panel/login-panel.component";
import {RegisterPanelComponent} from "../landing/register-panel/register-panel.component";
import {HomeComponent} from "./home.component";
import { RecordingsTableComponent } from './recordings-table/recordings-table.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {path: 'home', component: HomeComponent}
]


@NgModule({
  declarations: [
    RecordingsTableComponent,
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeModule { }
