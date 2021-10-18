import { APP_BASE_HREF, registerLocaleData } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import localePt from "@angular/common/locales/pt";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from "./core/services/error.handle.service";

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

registerLocaleData(localePt);


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		CoreModule
	],
	providers: [
		[{ provide: APP_BASE_HREF, useValue: "/" }],
		httpInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
