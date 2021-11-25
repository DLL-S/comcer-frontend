/**
 * Representa um objeto para paginação de dados do back end.
 */
export class Paginacao {

	public campo: string;
	public primeiroObjetoPagina: number;
	public qtdeObjetos: number;
	public ordemDeOrdenacao: -1 | 1;

	/**
	 * Inicia uma nova instância
	 */
	public constructor (campo: string, indice: number, qtdePorPagina: number, ordem: 1 | -1) {
		this.campo = campo;
		this.primeiroObjetoPagina = indice;
		this.qtdeObjetos = qtdePorPagina;
		this.ordemDeOrdenacao = ordem;
	}
}
