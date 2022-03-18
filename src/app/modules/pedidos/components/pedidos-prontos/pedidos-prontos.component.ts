import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { Store } from "src/app/modules/states/store";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";

@Component({
    selector: 'app-pedidos-prontos',
    templateUrl: './pedidos-prontos.component.html',
    styleUrls: [ '../shared-styles.css' ]
})
export class PedidosProntosComponent implements OnInit {

    pedidosProntos: PedidoViewModel[] = [];

    constructor (private produtosPedidoService: ProdutosPedidosService, private store: Store) {
        this.store.pedidosView$.subscribe({
            next: pedidos => {

                const pedidosFiltrados = pedidos.filter(pedido =>
                    pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pronto);

                if (this.pedidosProntos.length == 0)
                    this.pedidosProntos = pedidosFiltrados;
                else {
                    pedidosFiltrados.map(item => {
                        const index = this.pedidosProntos.findIndex(x => x.idDoProdutoDoPedido == item.idDoProdutoDoPedido);
                        if (index >= 0) {
                            this.pedidosProntos[ index ] = item;
                        }
                        else {
                            this.pedidosProntos.push(item);
                        }
                    });
                }

                this.pedidosProntos = this.pedidosProntos.filter(x =>
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
            this.produtosPedidoService.atualizarStatusProdutoPedido(event, EnumStatusProdutoDoPedido.Pronto);
        }
    }
}