import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigatorComponent } from './components/navigation/navigator/navigator.component';
import { ValidacoesComponent } from './components/validacoes/validacoes.component';
import { BaseGuard } from "./helpers/base.guard";
import { Interceptor } from "./helpers/interceptor";
import { AuthService } from "./services/auth.service";

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
];

@NgModule({
	declarations: [
		LoginComponent,
		NavigatorComponent,
		ValidacoesComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatToolbarModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatListModule,
		MatExpansionModule,
		MatIconModule
	],
	exports: [
		LoginComponent,
		NavigatorComponent,
		ValidacoesComponent
	],
	providers: [
		httpInterceptorProviders,
		AuthService,
		BaseGuard
	]
})
export class CoreModule { }
