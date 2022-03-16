import { debounceTime, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { ResponseModel } from 'src/app/core/models/response.model';
import { BaseModel } from "src/app/shared/models/base.model";
import { GenericApi } from "../generic-api.service";
import { NotificationService } from "../notification.service";
import { GenericState } from "../states/generic.state";

/**
 * Faz intermédio entre os serviços de api e o estado da aplicação web.
 */
export abstract class BaseFacade<TModel extends BaseModel, TApi extends GenericApi<TModel>, TState extends GenericState<TModel>> {

    public objetos$: Observable<TModel[]>;

    /**
     * Inicia uma nova instância do facade.
     * @param api O serviço de api de {@link TApi}.
     * @param state O gerenciador de estado de {@link TState}.
     */
    public constructor (
        protected api: TApi,
        protected state: TState,
        protected notificationService: NotificationService
    ) {
        this.carregarObjetos();
        this.objetos$ = this.state.objetos$;
    }

    /**
     * Carrega os objetos do back end no state.
     */
    public carregarObjetos(): void {
        let response$ = this.api.listar();
        this.processeResponseDeLeitura(response$);
    }

    /**
     * Faz uma pesquisa no back end e adiciona os resultados ao state.
     * @param termoDeBusca A string de consulta.
     */
    public pesquisar(termoDeBusca$: Observable<string>): void {
        let response$ = termoDeBusca$.pipe(distinctUntilChanged(), debounceTime(300),
            switchMap(termoDeBusca => {
                return this.api.pesquisar(termoDeBusca);
            }));
        this.processeResponseDeLeitura(response$);
    }

    /**
     * Pesquisa um objeto no back end pelo Id.
     * @param id O id de consulta.
     * @returns O {@link TModel} contendo os dados da resposta ou null.
     */
    public pesquisarPorId(id: number): TModel | null {
        let objeto = this.state.pesquisarPorId(id);
        if (!objeto) {
            this.api.pesquisarPorId(id).subscribe(response => objeto = response);
        }

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
                this.state.atualizar(objetoCadastrado, tempObjeto.id);
                this.notificationService.exibir(`$Cadastro realizado com sucesso! (Id: ${ objetoCadastrado.id })`);
            },
            error: erro => {
                this.state.remover(tempObjeto.id);
                this.notificationService.exibir("Ocorreu um erro ao processar sua solicitação.");
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
                    this.state.atualizar(objeto);
                    this.notificationService.exibir("Atualização realizada com sucesso!");
                },
                error: erro => {
                    this.notificationService.exibir("Ocorreu um erro ao processar sua solicitação.");
                }
            });
        }
        else {
            this.notificationService.exibir("Informe um Id valido para alterar.");
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
                this.notificationService.exibir(`$Exclusão realizada com sucesso! (Id: ${ id })`);
            },
            error: erro => {
                this.notificationService.exibir("Ocorreu um erro ao processar sua solicitação.");
            }
        });
    }

    private processeResponseDeLeitura(response: Observable<ResponseModel<TModel>>) {
        response.subscribe(response => {
            let data = response.resultados as TModel[];
            this.state.objetos = data;
        });
    }
}
