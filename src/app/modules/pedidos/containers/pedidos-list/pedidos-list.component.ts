import { Component, OnDestroy, OnInit } from '@angular/core';
import { PedidosService } from "../../services/pedidos.service";

@Component({
    selector: 'app-pedidos-list',
    templateUrl: './pedidos-list.component.html',
    styleUrls: [ './pedidos-list.component.css' ]
})
export class PedidosListComponent implements OnInit, OnDestroy {

    scheduler: any;

    constructor (
        private pedidosService: PedidosService,
    ) {
        this.atualizarDados();
    }

    ngOnInit(): void {
        this.scheduler = setInterval(() => {
            this.atualizarDados();
        }, 60000);
    }

    ngOnDestroy(): void {
        if (this.scheduler)
            clearInterval(this.scheduler);
    }

    atualizarDados() {
        this.pedidosService.listaDeProdutosPorPedido$.subscribe();
    }
}
