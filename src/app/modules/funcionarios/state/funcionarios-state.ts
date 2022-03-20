import { map } from "rxjs";
import { Store } from "../../states/store";

export class FuncionariosState extends Store {

    /**
     * Obtém um {@link Observable} contendo a lista de {@link Funcionario} do state.
     */
    public get funcionarios$() {
        return this.store.pipe(
            map(store => {
                return store.funcionarios;
            })
        );
    }
}
