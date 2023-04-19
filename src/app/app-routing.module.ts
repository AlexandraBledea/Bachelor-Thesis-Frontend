import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPanelComponent} from "./landing/login-panel/login-panel.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPanelComponent},
  {path: "**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
