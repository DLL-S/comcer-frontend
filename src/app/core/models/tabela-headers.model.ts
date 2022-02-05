/**
 * Classe para definição das colunas a serem exibidas em uma tabela.
 */
export class ColunasParaTabela {
	colunas: Array<{ campo: string; descricao: string; ordenavel: boolean; }>;
	exibirAcoes: boolean;

	/**
	 * Inicia uma nova instância da classe ColunasParaTabela.
	 */
	constructor (colunas: Array<{ campo: string; descricao: string; ordenavel: boolean; }>, exibirAcoes: boolean = false) {
		this.colunas = colunas;
		this.exibirAcoes = exibirAcoes;
	}
}
