
/**
 * Modelo de objetos base.
 */
export interface ResponseModel {
	resultados: any[];
	validacoes: any;
	sucesso: boolean;
	pagina: number;
	quantidade: number;
	total: number;
}
