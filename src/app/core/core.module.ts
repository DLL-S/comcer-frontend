import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { AcessoNegadoComponent } from './components/pages/acesso-negado/acesso-negado.component';
import { PaginaEmConstrucaoComponent } from './components/pages/pagina-em-construcao/pagina-em-construcao.component';
import { PaginaNaoEncontradaComponent } from "./components/pages/pagina-nao-encontrada/pagina-nao-encontrada.component";

@NgModule({
	declarations: [
		PaginaNaoEncontradaComponent,
		AcessoNegadoComponent,
		PaginaEmConstrucaoComponent,
		LoginComponent,
		HeaderComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		PaginaNaoEncontradaComponent,
		AcessoNegadoComponent,
		PaginaEmConstrucaoComponent,
		LoginComponent,
		HeaderComponent
	]
})
export class CoreModule { }
