/**
 * Classe para definição do título na aba do navegador e no header da página.
 */
export class Titulo {
	tituloNoHeader: string;
	url: string;

	/**
	 * Inicia uma nova instância da classe Titulo definindo o título e a url.
	 */
	constructor(novoTituloNoHeader: string, novaUrl: string) {
		this.tituloNoHeader = novoTituloNoHeader;
		this.url = novaUrl;
	}
}
