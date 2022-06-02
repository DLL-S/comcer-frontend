import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ValidacaoModel } from './../../models/validacao.model';

/**
 * State para o armazenamento de {@link ValidacaoModel} do backend.
 */
@Injectable({
	providedIn: 'root'
})
export class ValidacoesState {

	protected readonly subject = new BehaviorSubject<ValidacaoModel[]>([]);
	protected state$ = this.subject.asObservable();

	/**
	 * Inicia uma nova instância do controlador de estado IsMobile.
	 */
	public constructor () { }

	/**
	 * Obtém o valor no estado atual.
	 */
	public get estado() {
		return this.subject.value;
	}

	/**
	 * Observable para o estado.
	 */
	public get estado$(): Observable<ValidacaoModel[]> {
		return this.state$.pipe(
			map(t => t)
		);
	}

	/**
	 * Preenche o store com as validações informadas.
	 * @param validacoes Os valores a serem adicionados.
	 */
	public set(validacoes: ValidacaoModel[]) {
		this.subject.next(validacoes);
	}
}
