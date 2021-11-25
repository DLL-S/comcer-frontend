/**
 * Classe para definição do título na aba do navegador e no header da página.
 */
export class ColunasParaTabela {
	colunas: Array<{ campo: string; descricao: string; ordenavel: boolean; }>
	exibirAcoes: boolean;

	/**
	 * Inicia uma nova instância da classe Titulo definindo o título e a ordenavel.
	 */
	constructor(colunas: Array<{ campo: string; descricao: string; ordenavel: boolean; }>, exibirAcoes: boolean = false) {
		this.colunas = colunas;
		this.exibirAcoes = exibirAcoes;
	}
}
