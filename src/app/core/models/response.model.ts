import { ValidacaoModel } from "./validacao.model";

/**
 * Modelo de objetos base.
 */
export interface ResponseModel<TModel> {
	resultados: TModel[];
	validacoes: ValidacaoModel[];
	sucesso: boolean;
	pagina: number;
	quantidade: number;
	total: number;
}
