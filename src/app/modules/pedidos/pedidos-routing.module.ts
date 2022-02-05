import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosListComponent } from "./containers/pedidos-list/pedidos-list.component";

const pedidosRoutes: Routes = [
	{ path: "", component: PedidosListComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(pedidosRoutes)
	],
	exports: []
})
export class PedidosRoutingModule { }
