import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ColunasParaTabela } from 'src/app/core/models/tabela-headers.model';

@Component({
	selector: 'app-base-table',
	templateUrl: './base-table.component.html',
	styleUrls: [ './base-table.component.css' ]
})
export class BaseTableComponent implements OnInit {

	@Input() colunas?: ColunasParaTabela;
	@Input() dados$: Observable<unknown[]>;
	@Input() carregando$?: Observable<boolean>;
	@Input() paginacao: boolean;
	@Input() qtdeLinhas: number;
	@Input() destacarLinha: boolean;
	@Input() dadoChave: string;
	@Input() camposDoFiltro: string[];
	@Input() exibirBotaoNovo: boolean;
	@Input() exibirBotaoRecarregar: boolean;
	@Output() eventoDeCarregamento: EventEmitter<unknown>;
	@Output() eventoDeFormDeEdicao: EventEmitter<unknown>;
	@Output() eventoDeInativacao: EventEmitter<number>;

	constructor () {
		this.dados$ = new Observable<unknown[]>();
		this.paginacao = true;
		this.qtdeLinhas = 5;
		this.destacarLinha = true;
		this.dadoChave = "";
		this.camposDoFiltro = [ '' ];
		this.exibirBotaoNovo = false;
		this.exibirBotaoRecarregar = false;

		this.eventoDeCarregamento = new EventEmitter();
		this.eventoDeFormDeEdicao = new EventEmitter();
		this.eventoDeInativacao = new EventEmitter();
	}

	ngOnInit(): void {
	}

	carregarDados(): void {
		this.eventoDeCarregamento.emit();
	}

	dispararFormDeEdicao(linha: unknown): void {
		this.eventoDeFormDeEdicao.emit(linha);
	}

	dispararInativacao(id: number): void {
		this.eventoDeInativacao.emit(id);
	}
}
