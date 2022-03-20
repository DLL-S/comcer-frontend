import { map } from "rxjs";
import { Store } from "../../states/store";

export class PedidosState extends Store {

    /**
     * Obtém um {@link Observable} contendo a lista de {@link PedidoViewModel} do state.
     */
    public get pedidosView$() {
        return this.store.pipe(
            map(store => {
                return store.pedidosView;
            })
        );
    }
}
