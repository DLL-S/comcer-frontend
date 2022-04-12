import { BehaviorSubject } from 'rxjs';
import { State } from "./state";

const state: State = {
	pedidosView: [],
	funcionarios: [],
	produtos: []
};

/**
 * Classe de estado de base.
 */
export class Store {

	private subject = new BehaviorSubject<State>(state);
	protected store = this.subject.asObservable();

	/**
	 * Obtém os valore do estado de um determinado store.
	 */
	public get value() {
		return this.subject.value;
	}

	/**
	 * Preenche um determinado store.
	 * @param valor Os valores a serem adicionados.
	 * @param storeName O nome do store utilizado.
	 */
	public set(valor: any, storeName: 'pedidosView' | 'funcionarios' | 'produtos') {
		this.subject.next({
			...this.value, [ storeName ]: valor || []
		});
	}

	/**
	 * Adiciona itens em um determinado store.
	 * @param valor Os valores a serem adicionados.
	 * @param storeName O nome do store utilizado.
	 */
	public adicionar(valor: any, storeName: 'pedidosView' | 'funcionarios' | 'produtos') {
		this.value[ storeName ].push(valor);
		this.subject.next(this.value);
	}
}
