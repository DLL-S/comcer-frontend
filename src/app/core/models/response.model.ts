import { BaseModel } from './../../shared/models/base.model';

/**
 * Modelo de objetos base.
 */
export interface ResponseModel<TModel extends BaseModel> {
    resultados: TModel[];
    validacoes: { propriedade: string, mensagem: string, impeditivo: boolean; }[];
    sucesso: boolean;
    pagina: number;
    quantidade: number;
    total: number;
}
