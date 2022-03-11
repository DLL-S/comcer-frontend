import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./core/components/login/login.component";
import { AcessoNegadoComponent } from "./core/components/pages/acesso-negado/acesso-negado.component";
import { PaginaEmConstrucaoComponent } from "./core/components/pages/pagina-em-construcao/pagina-em-construcao.component";
import { PaginaNaoEncontradaComponent } from "./core/components/pages/pagina-nao-encontrada/pagina-nao-encontrada.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "acesso-negado", component: AcessoNegadoComponent },
	{ path: "pagina-nao-encontrada", component: PaginaNaoEncontradaComponent },
	{ path: "pagina-em-construcao", component: PaginaEmConstrucaoComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
