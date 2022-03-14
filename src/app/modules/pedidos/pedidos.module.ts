import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PedidosListComponent } from './containers/pedidos-list/pedidos-list.component';

@NgModule({
    declarations: [
        PedidosListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PedidosModule { }
