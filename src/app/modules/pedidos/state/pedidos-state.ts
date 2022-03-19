import { map } from "rxjs";
import { Store } from "../../states/store";

export class PedidosState extends Store {

    public get pedidosView$() {
        return this.store.pipe(
            map(store => {
                return store.pedidosView;
            })
        );
    }
}
