import { APP_BASE_HREF, registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import localePt from "@angular/common/locales/pt";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { Store } from "./modules/states/store";
import { SharedModule } from "./shared/shared.module";

registerLocaleData(localePt);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CoreModule,
		SharedModule
	],
	providers: [
		[ { provide: APP_BASE_HREF, useValue: "/" } ],
		Store
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
