import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "src/app/shared/utils/LocalStorageUtils";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	/**
	 * Inicia uma instância de {@link @ErrorInterceptor}.
	 * @param router O {@link Route} para acompanhamento da rota.
	 */
	public constructor(private router: Router) { }

	private _localStorageUtil = new LocalStorageUtils();

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(
			catchError(error => {

				if (error instanceof HttpErrorResponse) {

					if (error.status === 401) {
						this._localStorageUtil.limparDadosLocaisUsuario();
						this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url } });
					}
					if (error.status === 403) {
						this.router.navigate(['/acesso-negado']);
					}
				}

				return throwError(() => error);
			}));
	}
}
