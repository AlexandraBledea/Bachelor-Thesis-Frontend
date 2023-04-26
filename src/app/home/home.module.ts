import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {LoginPanelComponent} from "../landing/login-panel/login-panel.component";
import {RegisterPanelComponent} from "../landing/register-panel/register-panel.component";
import {HomeComponent} from "./home.component";
import { RecordingsTableComponent } from './recordings-table/recordings-table.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent}
]


@NgModule({
  declarations: [
    RecordingsTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
