
/**
 * Modelo de objetos base.
 */
export interface ResponseModel<TModel> {
    resultados: TModel[];
    validacoes: { propriedade: string, mensagem: string, impeditivo: boolean; }[];
    sucesso: boolean;
    pagina: number;
    quantidade: number;
    total: number;
}
