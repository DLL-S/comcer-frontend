import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./core/components/login/login.component";
import { BaseGuard } from './core/helpers/base.guard';
import { PaginaEmConstrucaoComponent } from "./shared/pages/pagina-em-construcao/pagina-em-construcao.component";
import { PaginaNaoEncontradaComponent } from "./shared/pages/pagina-nao-encontrada/pagina-nao-encontrada.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{
		path: "", loadChildren: () =>
			import("./modules/pedidos/pedidos.module").then(m => m.PedidosModule),
		canActivate: [ BaseGuard ]
	},
	{
		path: "home", loadChildren: () =>
			import("./modules/pedidos/pedidos.module").then(m => m.PedidosModule),
		canActivate: [ BaseGuard ]
	},
	{
		path: "pedidos", loadChildren: () =>
			import("./modules/pedidos/pedidos.module").then(m => m.PedidosModule),
		canActivate: [ BaseGuard ]
	},
	{
		path: "comandas", loadChildren: () =>
			import("./modules/comandas/comandas.module").then(m => m.ComandasModule),
		canActivate: [ BaseGuard ]
	},
	{
		path: "mesas", loadChildren: () =>
			import("./modules/mesas/mesas.module").then(m => m.MesasModule),
		canActivate: [ BaseGuard ]
	},
	{
		path: "produtos", loadChildren: () =>
			import("./modules/produtos/produtos.module").then(m => m.ProdutosModule),
		canActivate: [ BaseGuard ]
	},
	{
		path: "funcionarios", loadChildren: () =>
			import("./modules/funcionarios/funcionarios.module").then(m => m.FuncionariosModule),
		canActivate: [ BaseGuard ]
	},


	// { path: "comandas", loadChildren: () => import("./modules/comandas/comandas.module").then(m => m.ComandasModule) },
	{
		path: "pagina-em-construcao", component: PaginaEmConstrucaoComponent,
		canActivate: [ BaseGuard ]
	},
	{
		path: '**', component: PaginaNaoEncontradaComponent,
		canActivate: [ BaseGuard ]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
