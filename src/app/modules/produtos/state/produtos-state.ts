import { map } from "rxjs";
import { Store } from "../../states/store";

export class ProdutosState extends Store {

	/**
	 * Obtém um {@link Observable} contendo a lista de {@link Produto} do state.
	 */
	public get produtos$() {
		return this.store.pipe(
			map(store => {
				return store.produtos;
			})
		);
	}
}
