import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { Titulo } from "../models/titulo.model";

/**
 * Serviço para definição e obtenção dos títulos das páginas.
 */
@Injectable({
	providedIn: 'root'
})
export class TitleService extends Title {

	/**
	 * Estado que armazena o titulo a ser exibido no header e sua url.
	 */
	private _headerData = new BehaviorSubject<Titulo>({
		tituloNoHeader: "",
		url: "/"
	});

	/**
	 * Inicia uma nova instância da classe.
	 */
	constructor() {
		super(document)
	}

	/**
	 * Obtém o título e sua url.
	 */
	public get headerData(): Titulo {
		return this._headerData.value;
	}

	/**
	 * Define os títulos a serem exibidos.
	 * @param tituloNaAba Título a ser exibido na aba (Pré-fixo "Comanda Certa | ").
	 * @param novoTituloNoHeader Título a ser exibido no header (Por padrão o mesmo da aba).
	 * @param novaUrl Url do título no header (Padrão "/").
	 */
	public override setTitle(tituloNaAba: string, novaUrl?: string, novoTituloNoHeader?: string) {
		super.setTitle("Comanda Certa | " + tituloNaAba);
		this._headerData.next(new Titulo(novoTituloNoHeader || tituloNaAba, novaUrl || "/"));
	}
}
