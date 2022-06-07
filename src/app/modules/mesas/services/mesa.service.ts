import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { GenericApi } from 'src/app/core/services/generic-api.service';
import { NotificationService } from "src/app/core/services/notification.service";
import { ResponseModel } from '../../../core/models/response.model';
import { Mesa } from "../models/mesa.model";
import { MesaState } from '../state/mesa.state';

@Injectable()
export class MesaService extends GenericApi<Mesa> {

	/**
	 * Inicia uma nova instância de {@link MesaService}
	 * @param http O {@link HttpClient} do serviço.
	 */
	constructor (http: HttpClient, private state: MesaState, private notificationService: NotificationService) {
		super(http, "/mesa");
	}

	/**
	 * Obtém uma lista de {@link Mesa} da API.
	 */
	public listaDeMesas$ = this.http
		.get<ResponseModel<Mesa>>(this.apiBaseUrl)
		.pipe(
			tap(next => {
				this.state.set(next.resultados, "mesas");
			})
		);

	public atualizaState(mesaAtualizado: Mesa) {
		const stateValue = this.state.value.mesas;

		const mesas = stateValue.map((mesaState: Mesa) => {
			if (mesaAtualizado.id == mesaState.id)
				return { ...mesaState, ...mesaAtualizado };
			else
				return mesaState;
		});

		this.state.set(mesas, "mesas");
	}

	adicionaState(mesa: Mesa) {
		this.state.adicionar(mesa, "mesas");
	}
}
