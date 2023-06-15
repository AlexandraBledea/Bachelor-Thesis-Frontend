import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginFormComponent } from './landing/login-panel/login-form/login-form.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { LoginResetFormComponent } from './landing/login-panel/login-reset-form/login-reset-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {LoginPanelModule} from "./landing/login-panel.module";
import { RegisterPanelComponent } from './landing/register-panel/register-panel.component';
import {RegisterFormComponent} from "./landing/register-panel/register-form/register-form.component";
import { HomeComponent } from './home/home.component';
import {AuthenticationInterceptor} from "./service/authentication-interceptor.service";
import {HomeModule} from "./home/home.module";
import { ExpertUserComponent } from './expert-user/expert-user.component';
import { SimpleUserComponent } from './simple-user/simple-user.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { PredictionsListComponent } from './predictions-list/predictions-list.component';
import { PredictionCardComponent } from './predictions-list/prediction-card/prediction-card.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ErrorInterceptor} from "./service/error-interceptor.service";
import {PrivacyStatementComponent} from "./landing/privacy-statement/privacy-statement.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPanelComponent,
    LoginResetFormComponent,
    RegisterPanelComponent,
    RegisterFormComponent,
    HomeComponent,
    ExpertUserComponent,
    SimpleUserComponent,
    PredictionsListComponent,
    PredictionCardComponent,
    PrivacyStatementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    LoginPanelModule,
    HomeModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NgApexchartsModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
