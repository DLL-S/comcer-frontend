import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { CancelConfirmDialogComponent } from './components/cancel-confirm-dialog/cancel-confirm-dialog.component';
import { PedidosCozinhandoComponent } from './components/pedidos-cozinhando/pedidos-cozinhando.component';
import { PedidosItemComponent } from './components/pedidos-item/pedidos-item.component';
import { PedidosPendentesComponent } from './components/pedidos-pendentes/pedidos-pendentes.component';
import { PedidosProntosComponent } from './components/pedidos-prontos/pedidos-prontos.component';
import { PedidosListComponent } from './containers/pedidos-list/pedidos-list.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosService } from "./services/pedidos.service";
import { ProdutosPedidosService } from './services/produtos-pedidos.service';
import { PedidosState } from "./state/pedidos-state";

@NgModule({
	declarations: [
		PedidosListComponent,
		PedidosPendentesComponent,
		PedidosCozinhandoComponent,
		PedidosProntosComponent,
		PedidosItemComponent,
		CancelConfirmDialogComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		PedidosRoutingModule,
		MatCardModule,
		MatButtonModule,
		DragDropModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatDialogModule
	],
	providers: [
		PedidosService,
		ProdutosPedidosService,
		PedidosState
	]
})
export class PedidosModule { }
