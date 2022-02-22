import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from "primeng/inputtext";
import { CoreModule } from "src/app/core/core.module";
import { PedidosListComponent } from './containers/pedidos-list/pedidos-list.component';
import { PedidosRoutingModule } from "./pedidos-routing.module";
import { PedidosApi } from "./services/pedidos-api";

@NgModule({
	declarations: [
		PedidosListComponent
	],
	imports: [
		CommonModule,
		PedidosRoutingModule,
		CoreModule,
		DataViewModule,
		InputTextModule,
		ButtonModule
	],
	providers: [
		PedidosApi,
	]
})
export class PedidosModule { }
