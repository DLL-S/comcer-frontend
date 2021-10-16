/**
 * Utilitário para operações diretas no LocalStorage.
 */
export class LocalStorageUtils {

	/**
	 * Obtém o usuário.
	 * @returns Um objeto json contendo o usuário armazenado no storage.
	 */
	public obtenhaUsuario() {
		return JSON.parse(localStorage.getItem("comcer.user") || "");
	}

	/**
	 * Obtém o token do usuário.
	 * @returns O token do usuário no storage.
	 */
	 public obterTokenUsuario(): string | null {
        return localStorage.getItem("");
    }

	/**
	 * Salva um usuário e seu token no storage.
	 * @param response A response de autenticação contendo o token de acesso do usuário.
	 */
	public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
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
