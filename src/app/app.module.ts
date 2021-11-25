import { APP_BASE_HREF, registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import localePt from "@angular/common/locales/pt";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormsPrimeNGUIModule } from "@ng-dynamic-forms/ui-primeng";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from './core/core.module';

registerLocaleData(localePt);


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		DynamicFormsPrimeNGUIModule,
		AppRoutingModule,
		HttpClientModule,
		CoreModule
	],
	providers: [
		[ { provide: APP_BASE_HREF, useValue: "/" } ],
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
