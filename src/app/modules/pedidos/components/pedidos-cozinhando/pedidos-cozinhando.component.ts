import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { Store } from "src/app/modules/states/store";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";

@Component({
    selector: 'app-pedidos-cozinhando',
    templateUrl: './pedidos-cozinhando.component.html',
    styleUrls: [ '../shared-styles.css' ]
})
export class PedidosCozinhandoComponent implements OnInit {

    pedidosCozinhando: PedidoViewModel[] = [];

    constructor (private produtosPedidoService: ProdutosPedidosService, private store: Store) {
        this.store.pedidosView$.subscribe({
            next: pedidos => {

                const pedidosFiltrados = pedidos.filter(pedido =>
                    pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Cozinhando);

                if (this.pedidosCozinhando.length == 0)
                    this.pedidosCozinhando = pedidosFiltrados;
                else {
                    pedidosFiltrados.map(item => {
                        const index = this.pedidosCozinhando.findIndex(x => x.idDoProdutoDoPedido == item.idDoProdutoDoPedido);
                        if (index >= 0) {
                            this.pedidosCozinhando[ index ] = item;
                        }
                        else {
                            this.pedidosCozinhando.push(item);
                        }
                    });
                }

                this.pedidosCozinhando = this.pedidosCozinhando.filter(x =>
                    pedidosFiltrados.find(y => y.idDoProdutoDoPedido == x.idDoProdutoDoPedido));
            }
        });
    }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<PedidoViewModel[]>) {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            this.produtosPedidoService.atualizarStatusProdutoPedido(event, EnumStatusProdutoDoPedido.Cozinhando);
        }
    }
}
