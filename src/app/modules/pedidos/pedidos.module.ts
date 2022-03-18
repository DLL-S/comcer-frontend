import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PedidosCozinhandoComponent } from './components/pedidos-cozinhando/pedidos-cozinhando.component';
import { PedidosPendentesComponent } from './components/pedidos-pendentes/pedidos-pendentes.component';
import { PedidosProntosComponent } from './components/pedidos-prontos/pedidos-prontos.component';
import { PedidosListComponent } from './containers/pedidos-list/pedidos-list.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosService } from "./services/pedidos.service";
import { ProdutosPedidosService } from './services/produtos-pedidos.service';

@NgModule({
    declarations: [
        PedidosListComponent,
        PedidosPendentesComponent,
        PedidosCozinhandoComponent,
        PedidosProntosComponent,
    ],
    imports: [
        CommonModule,
        PedidosRoutingModule,
        MatCardModule,
        MatButtonModule,
        DragDropModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    providers: [
        PedidosService,
        ProdutosPedidosService,
    ]
})
export class PedidosModule { }
