import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from "rxjs";
import { NotificationService } from '../../../../core/services/notification.service';
import { TitleService } from '../../../../core/services/title.service';
import { PedidosService } from "../../services/pedidos.service";

@Component({
	selector: 'app-pedidos-list',
	templateUrl: './pedidos-list.component.html',
	styleUrls: [ './pedidos-list.component.css' ]
})
export class PedidosListComponent implements OnInit, OnDestroy {

	scheduler: any;
	carregando: boolean = true;

	constructor (
		private pedidosService: PedidosService,
		private notificationService: NotificationService,
		titleService: TitleService
	) {
		titleService.setTitle("Fila de pedidos");
		this.atualizarDados();
	}

	ngOnInit(): void {
		this.scheduler = setInterval(() => {
			if (this.pedidosService.podeAtualizarListas)
				this.atualizarDados();
		}, 5000);
	}

	ngOnDestroy(): void {
		if (this.scheduler)
			clearInterval(this.scheduler);
	}

	atualizarDados(exibirNotificacao: boolean = false) {
		this.carregando = true;
		this.pedidosService.listaDeProdutosPorPedido$
			.pipe(take(1))
			.subscribe(() => {
				if (exibirNotificacao)
					this.notificationService.exibir("Dados atualizados com sucesso!");
				this.carregando = false;
			});
	}
}
