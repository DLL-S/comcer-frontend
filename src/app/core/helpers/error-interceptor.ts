import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "src/app/shared/utils/LocalStorageUtils";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	private _localStorageUtil: LocalStorageUtils;

	/**
	 * Inicia uma instância de {@link @ErrorInterceptor}.
	 * @param router O {@link Route} para acompanhamento da rota.
	 */
	public constructor (private router: Router) {
		this._localStorageUtil = new LocalStorageUtils();
	}


	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(
			catchError(requisicao => {
				return this.tratarErros(requisicao);
			}));
	}

	private tratarErros(requisicao: any) {
		if (requisicao instanceof HttpErrorResponse) {

			let customError: string[] = [];

			switch (requisicao.status) {
				case 400: // Bad request
					// TODO: Fazer alguma coisa...
					break;
				case 401: // Unauthorized
					this._localStorageUtil.limparDadosLocaisUsuario();
					this.router.navigate([ '/conta/login' ], { queryParams: { returnUrl: this.router.url } });
					break;
				case 403: // Not allowed
					this.router.navigate([ '/acesso-negado' ]);
					break;
				case 404: // Not found
					this.router.navigate([ '/pagina-nao-encontrada' ], { queryParams: { returnUrl: this.router.url } });
					break;
				case 500: // Internal server error
					customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o administrador do sistema.");
					requisicao.error.errors = customError;
					break;
				default:
					customError.push("Ocorreu um erro desconhecido");
					console.log("back tá off");
					//this.router.navigate(['/pagina-nao-encontrada'], { queryParams: { returnUrl: this.router.url } }); // TODO Remover
					requisicao.error.errors = customError;
					break;
			}
		}

		return throwError(() => requisicao);
	}
}
