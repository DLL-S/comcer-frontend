import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LoginService } from "../services/login.service";
import { NotificationService } from './../services/notification.service';

/**
 * Interceptador de erros HTTP global.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    /**
     * Inicia uma instância de {@link @ErrorInterceptor}.
     * @param router O {@link Route} para acompanhamento da rota.
     */
    public constructor (
        private loginService: LoginService,
        private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
                    this.loginService.logout();
                    break;
                case 403:
                    this.notificationService.exibir("Ops, você não possui permissão para acessar este recurso!");
                    break;
                case 404:
                    this.notificationService.exibir("Ops, o recurso que você tentou acessar não existe!");
                    break;
                case 500:
                    this.notificationService.exibir("Oops, ocorreu um erro no servidor!");
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
