import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPanelComponent} from "./landing/login-panel/login-panel.component";
import {RegisterPanelComponent} from "./landing/register-panel/register-panel.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPanelComponent},
  // {path: "**", redirectTo: "login"},
  {path: 'register', component: RegisterPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
