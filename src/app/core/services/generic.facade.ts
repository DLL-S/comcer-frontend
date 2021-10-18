import { debounceTime, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { BaseModel } from "src/app/shared/models/base.model";
import { GenericApi } from "./generic.api";
import { GenericState } from "./generic.state";

/**
 * Faz intermédio entre os serviços de api e o estado da aplicação web.
 */
export abstract class GenericFacade<TModel extends BaseModel, TApi extends GenericApi<TModel>, TState extends GenericState<TModel>> {

	public objetos$: Observable<any[]>;

	/**
	 * Inicia uma nova instância do facade.
	 * @param api O serviço de api de {@link TApi}.
	 * @param state O gerenciador de estado de {@link TState}.
	 */
	public constructor(
		protected api: TApi,
		protected state: TState
	) {
		this.carregarObjetos();
		this.objetos$ = this.state.objetos$;
	}

	/**
	 * Carrega os objetos do back end no state.
	 */
	public carregarObjetos() {
		this.api.pesquisar("").subscribe(objetos => this.state.objetos = objetos);
	}

	/**
	 * Faz uma pesquisa no back end e adiciona os resultados ao state.
	 * @param search A string de consulta.
	 */
	public pesquisar(search$: Observable<string>): void {
		search$.pipe(
			distinctUntilChanged(),
			debounceTime(300),
			switchMap(search => this.api.pesquisar(search))
		).subscribe(objetos => this.state.objetos = objetos);
	}

	/**
	 * Pesquisa um objeto no back end pelo Id.
	 * @param id O id de consulta.
	 * @returns O {@link TModel} contendo os dados da resposta ou null.
	 */
	public pesquisarPorId(id: number): TModel | null {
		let objeto = this.state.pesquisarPorId(id);
		if (!objeto)
			this.api.pesquisarPorId(id).subscribe(result => objeto = result);

		return objeto || null;
	}

	/**
	 * Adiciona um {@link TModel} no {@link TApi} e no {@link TState}.
	 * @param objeto O objeto a ser adicionado.
	 */
	public criar(objeto: TModel) {
		let tempObjeto = objeto;
		tempObjeto.id = -9999;
		this.state.criar(tempObjeto);

		this.api.criar(objeto).subscribe({
			next: objetoCadastrado => {
				this.state.atualizar(objetoCadastrado, tempObjeto.id)
				// TODO Notificar usuário...
			},
			error: erro => {
				this.state.remover(tempObjeto.id);
				// TODO Notificar usuário...
			}
		});
	}

	/**
	 * Atualiza um {@link TModel} no back end e no state.
	 * @param objeto O objeto a ser atualizado.
	 */
	public atualizar(objeto: TModel) {
		if (objeto.id) {
			this.state.atualizar(objeto);
			this.api.atualizar(objeto).subscribe({
				next: objeto => {
					this.state.atualizar(objeto)
					// TODO Notificar usuário...
				},
				error: erro => {
					// TODO Notificar usuário...
				}
			})
		}
		else {
			// TODO Notificar usuário...
		}
	}

	/**
	 * Remove um objeto no back end e no state.
	 * @param id O id do {@link TModel} a ser removido.
	 */
	public remover(id: number) {
		this.api.remover(id).subscribe({
			next: objeto => {
				this.state.remover(id);
				// TODO Notificar usuário...
			},
			error: erro => {
				// TODO Notificar usuário...
			}
		});
	}
}
