import { BaseModel } from "src/app/shared/models/base.model";
import { BaseState } from "./base.state";

/**
 * Classe de estado genérica.
 */
export abstract class GenericState<TModel extends BaseModel> extends BaseState<TModel> {

    /**
     * Consulta um {@link TModel} pelo id.
     * @param id O id a ser consultado.
     * @returns O {@link TModel} com o id ou undefined caso não encontre.
     */
    public pesquisarPorId(id: number): TModel | undefined {
        return this.objetos.find(x => x.id == id);
    }

    /**
     * Adiciona um novo {@link TModel} na state.
     * @param objeto O {@link TModel} a ser adicionado na state.
     * @returns O {@link TModel} adicionado.
     */
    public criar(objeto: TModel): TModel {
        this.objetos = [ ...this.objetos, objeto ];
        return objeto;
    }

    /**
     * Atualiza todos os dados de um objeto.
     * @param objeto O {@link TModel} com os dados atualizados.
     * @param id O id do objeto a ser atualizado (Opcional).
     * @returns O {@link TModel} atualizado ou null caso o id não seja encontrado.
     */
    public atualizar(objeto: TModel, id?: number): TModel | null {
        const objetoAtual = this.pesquisarPorId(id || objeto.id);

        if (objetoAtual) {
            const indice = this.objetos.indexOf(objetoAtual);
            this.objetos[ indice ] = objeto;
            this.objetos = [ ...this.objetos ];
            return this.objetos[ indice ];
        }

        return null;
    }

    /**
     * Remove um objeto do state.
     * @param id O Id do {@link TModel}
     */
    public remover(id: number) {
        this.objetos = this.objetos.filter(x => x.id != id);
    }
}
