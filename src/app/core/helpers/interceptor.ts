import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { LocalStorageService } from "../services/local-storage.service";
import { NotificationService } from '../services/notification.service';

/**
 * Interceptador de erros HTTP global.
 */
@Injectable()
export class Interceptor implements HttpInterceptor {

	/**
	 * Utilitário para armazenamento e consulta de dados no LocalStorage.
	 */
	public localStorage: LocalStorageService = new LocalStorageService();

	/**
	 * Inicia uma instância de {@link @ErrorInterceptor}.
	 * @param authService O serviço gerenciador de autenticação.
	 * @param notificationService O serviço de exibição de notificações.
	 */
	public constructor (
		private authService: AuthService,
		private notificationService: NotificationService
	) { }

	/**
	 * Handler padrão de requisições http.
	 * @param req A requisição a ser processada.
	 * @param next O próximo Handler do pipeline.
	 * @returns Um {@link Observable} de {@link HttpEvent}.
	 */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (this.authService.verificarLogin()) {
			req = req.clone({
				setHeaders: { Authorization: `Bearer ${ this.localStorage.obtenhaTokenUsuario() }` }
			});
		}

		return next.handle(req).pipe(
			catchError(requisicao => {
				return this.handleError(requisicao);
			}));
	}

	private handleError(response: any) {
		if (response instanceof HttpErrorResponse) {

			let customError: string[] = [];

			switch (response.status) {
				case 400:
					this.notificationService.exibir(response.error.message);
					break;
				case 401:
					this.authService.logout();
					break;
				case 403:
					this.notificationService.exibir("Ops, você não possui permissão para acessar este recurso!");
					break;
				case 404:
					this.notificationService.exibir("Ops, recurso não encontrado!");
					break;
				case 500:
					this.notificationService.exibir("Ops, ocorreu um erro no servidor!");
					customError.push("500: Internal server error");
					response.error.errors = customError;
					break;
				case 504:
					this.notificationService.exibir("Timeout: A conexão com servidor falhou.");
					customError.push("504: Connection timeout");
					break;
				default:
					this.notificationService.exibir("Erro desconhecido, contate o suporte!");
					customError.push("Erro desconhecido");
					response.error.errors = customError;
					break;
			}
		}

		return throwError(() => response);
	}
}
