import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPanelComponent} from "./landing/login-panel/login-panel.component";
import {RegisterPanelComponent} from "./landing/register-panel/register-panel.component";
import {HomeComponent} from "./home/home.component";
import {AuthguardService} from "./authguards/authguard.service";
import {AuthguardLoginService} from "./authguards/authguard-login.service";
import {AuthguardRegisterService} from "./authguards/authguard-register.service";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPanelComponent, canActivate:[AuthguardLoginService]},
  // {path: "**", redirectTo: "login"},
  {path: 'register', component: RegisterPanelComponent, canActivate:[AuthguardRegisterService]},
  {path: 'home', component:HomeComponent, canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
