import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPanelComponent} from "./landing/login-panel/login-panel.component";
import {RegisterPanelComponent} from "./landing/register-panel/register-panel.component";
import {HomeComponent} from "./home/home.component";
import {AuthguardService} from "./authguards/authguard.service";
import {AuthguardLoginService} from "./authguards/authguard-login.service";
import {AuthguardRegisterService} from "./authguards/authguard-register.service";
import {ExpertUserComponent} from "./expert-user/expert-user.component";
import {SimpleUserComponent} from "./simple-user/simple-user.component";
import {TermsConditionsComponent} from "./landing/terms-conditions/terms-conditions.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPanelComponent, canActivate:[AuthguardLoginService]},
  {path: 'home', component: HomeComponent, canActivate:[AuthguardService]},
  {path: 'register', component: RegisterPanelComponent, canActivate:[AuthguardRegisterService]},
  {path: 'simple-user', component:SimpleUserComponent, canActivate:[AuthguardService]},
  {path: 'expert-user', component: ExpertUserComponent, canActivate:[AuthguardService]},
  {path: 'terms-and-conditions', component: TermsConditionsComponent},
  {path: "**", redirectTo: "login"},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
