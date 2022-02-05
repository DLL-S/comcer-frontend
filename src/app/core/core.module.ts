import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsPrimeNGUIModule } from "@ng-dynamic-forms/ui-primeng";
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from "primeng/table";
import { BaseFormDialogComponent } from './components/base/base-form-dialog/base-form-dialog.component';
import { BaseTableComponent } from './components/base/base-table/base-table.component';
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from './components/navegacao/header/header.component';
import { AcessoNegadoComponent } from "./components/paginas/acesso-negado/acesso-negado.component";
import { PaginaEmConstrucaoComponent } from "./components/paginas/pagina-em-construcao/pagina-em-construcao.component";
import { PaginaNaoEncontradaComponent } from "./components/paginas/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { ErrorInterceptor } from "./helpers/error-interceptor";

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
	declarations: [
		PaginaNaoEncontradaComponent,
		AcessoNegadoComponent,
		PaginaEmConstrucaoComponent,
		LoginComponent,
		HeaderComponent,
		BaseTableComponent,
		BaseFormDialogComponent,
	],
	imports: [
		CommonModule,
		MenuModule,
		SidebarModule,
		TableModule,
		InputTextModule,
		ButtonModule,
		FormsModule,
		ReactiveFormsModule,
		DynamicFormsPrimeNGUIModule,
		DynamicDialogModule
	],
	exports: [
		PaginaNaoEncontradaComponent,
		AcessoNegadoComponent,
		PaginaEmConstrucaoComponent,
		LoginComponent,
		HeaderComponent,
		BaseTableComponent,
	],
	providers: [
		httpInterceptorProviders
	]
})
export class CoreModule { }
