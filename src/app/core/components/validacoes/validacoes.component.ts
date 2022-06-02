import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidacoesState } from "../../services/states/validacoes.state";
import { SubscriptionContainer } from './../../helpers/subscription-container';
import { ValidacaoModel } from './../../models/validacao.model';

@Component({
	selector: 'app-validacoes',
	templateUrl: './validacoes.component.html',
	styleUrls: [ './validacoes.component.css' ]
})
export class ValidacoesComponent implements OnInit, OnDestroy {

	validacoes: ValidacaoModel[] = [];
	private subscriptionContainer: SubscriptionContainer = new SubscriptionContainer();

	constructor (private validacoesState: ValidacoesState) { }

	ngOnInit(): void {
		this.validacoesState.set([]);
		this.subscriptionContainer.add = this.validacoesState.estado$.subscribe({
			next: result => {
				this.validacoes = result;
			}
		});
	}

	ngOnDestroy(): void {
		this.fechar();
	}

	fechar() {
		this.subscriptionContainer.dispose();
		this.validacoesState.set([]);
	}
}
