import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { ColunasParaTabela } from "src/app/core/models/tabela-headers.model";
import { TitleService } from "src/app/core/services/title.service";
import { Pedido } from "../../models/pedido.model";
import { PedidosApi } from "../../services/pedidos-api";

@Component({
	selector: 'app-pedidos-list',
	templateUrl: './pedidos-list.component.html',
	styleUrls: [ './pedidos-list.component.css' ]
})
export class PedidosListComponent implements OnInit {

	pedidos$: Observable<Pedido[]>;

	tabelaEstaCarregando$: Observable<boolean>;

	colunasTabela: ColunasParaTabela;
	camposDoFiltro: string[];

	constructor (private titleService: TitleService, private pedidosApi: PedidosApi) {

		this.titleService.setTitle("Pedidos", "/pedidos");
		this.pedidos$ = of(Array<Pedido>());
		this.tabelaEstaCarregando$ = of(false);
		this.colunasTabela = {
			colunas: [
				{ campo: "nome", descricao: "Nome", ordenavel: true },
				{ campo: "email", descricao: "Login", ordenavel: true },
				{ campo: "situacao", descricao: "Status", ordenavel: true }
			],
			exibirAcoes: true
		};
		this.camposDoFiltro = [ "nome", "email" ];
	}

	ngOnInit(): void {
		this.pedidos$ = this.pedidosApi.listar();
		this.pedidos$.subscribe(() => this.tabelaEstaCarregando$ = of(false));
	}

}
