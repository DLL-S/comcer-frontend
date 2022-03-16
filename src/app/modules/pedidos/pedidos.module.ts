import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PedidosListComponent } from './containers/pedidos-list/pedidos-list.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosService } from "./services/pedidos.service";

@NgModule({
    declarations: [
        PedidosListComponent
    ],
    imports: [
        CommonModule,
        PedidosRoutingModule
    ],
    providers: [
        PedidosService
    ]
})
export class PedidosModule { }
