import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './core/shared.module';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ng6-toastr-notifications";
import {NgxWebstorageModule} from "ngx-webstorage";
import {LoginComponent} from "./login/login.component";
import {HttpConfigInterceptor} from "./core/httpconfig.interceptor";
import {ErrorService} from "./service/error/error.service";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [

    BrowserAnimationsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
