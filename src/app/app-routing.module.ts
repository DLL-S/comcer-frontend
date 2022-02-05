import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./core/components/login/login.component";
import { AcessoNegadoComponent } from "./core/components/paginas/acesso-negado/acesso-negado.component";
import { PaginaEmConstrucaoComponent } from "./core/components/paginas/pagina-em-construcao/pagina-em-construcao.component";
import { PaginaNaoEncontradaComponent } from "./core/components/paginas/pagina-nao-encontrada/pagina-nao-encontrada.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "funcionarios", loadChildren: () => import("./modules/funcionarios/funcionarios.module").then(m => m.FuncionariosModule) },
	{ path: "pedidos", loadChildren: () => import("./modules/pedidos/pedidos.module").then(m => m.PedidosModule) },
	{ path: "acesso-negado", component: AcessoNegadoComponent },
	{ path: "pagina-nao-encontrada", component: PaginaNaoEncontradaComponent },
	{ path: "pagina-em-construcao", component: PaginaEmConstrucaoComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
