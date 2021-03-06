import { Usuario } from "../models/usuario.model";

/**
 * Utilitário para operações diretas no LocalStorage.
 */
export class LocalStorageService {

	/**
	 * Obtém o usuário.
	 * @returns Um objeto json contendo o usuário armazenado no storage.
	 */
	public obtenhaUsuario() {
		return localStorage.getItem("comcer.user");
	}

	/**
	 * Obtém o token do usuário.
	 * @returns O token do usuário no storage.
	 */
	public obtenhaTokenUsuario(): string | null {
		return localStorage.getItem("comcer.token");
	}

	/**
	 * Salva um usuário e seu token no storage.
	 * @param usuario O usuário de autenticação contendo o token de acesso do usuário.
	 */
	public salvarDadosLocaisUsuario(usuario: Usuario) {
		this.salvarTokenUsuario(usuario.token);
		this.salvarUsuario(usuario.usuario);
	}

	/**
	 * Remove os dados do usuário do storage.
	 */
	public limparDadosLocaisUsuario() {
		localStorage.removeItem("comcer.token");
		localStorage.removeItem("comcer.user");
	}

	/**
	 * Salva o token de um usuário no storage..
	 * @param token O token do usuário.
	 */
	public salvarTokenUsuario(token: string) {
		localStorage.setItem('comcer.token', token);
	}

	/**
	 * Salva um usuário no storage.
	 * @param usuario O usuário.
	 */
	public salvarUsuario(usuario: string) {
		localStorage.setItem('comcer.user', JSON.stringify(usuario));
	}
}
