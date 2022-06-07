import { map } from "rxjs";
import { Store } from "../../states/store";

export class MesaState extends Store {

	/**
	 * Obtém um {@link Observable} contendo a lista de {@link Mesa} do state.
	 */
	public get mesas$() {
		return this.store.pipe(
			map(store => {
				return store.mesas;
			})
		);
	}
}
