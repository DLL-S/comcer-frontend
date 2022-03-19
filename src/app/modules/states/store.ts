import { BehaviorSubject, map } from 'rxjs';
import { State } from "./state";

const state: State = {
    pedidosView: [],
    funcionarios: []
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
     * Adiciona itens em um determinado store.
     * @param value Os valores a serem adicionados.
     * @param storeName O nome do store utilizado.
     */
    public set(value: any, storeName: 'pedidosView' | 'funcionarios') {
        this.subject.next({
            ...this.value, [ storeName ]: value
        });
    }

    public get funcionarios$() {
        return this.store.pipe(
            map(store => {
                return store.funcionarios;
            })
        );
    }
}
