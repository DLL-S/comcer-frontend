import { map } from "rxjs";
import { Store } from "../../states/store";
import { Comanda } from './../models/comanda.model';

export class ComandasState extends Store {

	/**
	 * Obtém um {@link Observable} contendo a lista de {@link Comanda} do state.
	 */
	public get comandas$() {
		return this.store.pipe(
			map(store => {
				return store.comandas;
			})
		);
	}
}
