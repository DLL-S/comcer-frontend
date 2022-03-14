import { BehaviorSubject, map, Observable } from "rxjs";

/**
 * Classe de estado genérica.
 */
export abstract class GenericState<TModel> {

    protected readonly subject = new BehaviorSubject<TModel[]>([]);
    protected state = this.subject.asObservable();

    /**
     * Obtém o valor no estado atual.
     */
    public get objetos(): TModel[] {
        return this.subject.value;
    }

    /**
     * Adiciona e propaga registros ao estado atual.
     */
    public set objetos(val: TModel[]) {
        this.subject.next(val);
    }

    /**
     * Observable com todos os objetos no state.
     */
    public get objetos$(): Observable<TModel[]> {
        return this.state.pipe(
            map(t => t)
        );
    }
}
