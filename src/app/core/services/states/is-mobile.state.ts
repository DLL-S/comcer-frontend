import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

/**
 * Serviço para verificar o tamanho da tela e informar se é Mobile.
 */
@Injectable({
	providedIn: 'root'
})
export class IsMobileState {

	protected readonly subject = new BehaviorSubject<boolean>(false);
	protected state = this.subject.asObservable();

	/**
	 * Inicia uma nova instância do controlador de estado IsMobile.
	 */
	public constructor () { }

	/**
	 * Obtém o valor no estado atual.
	 */
	public get estado(): boolean {
		return this.subject.value;
	}

	/**
	 * Observable para o estado.
	 */
	public get estado$(): Observable<boolean> {
		return this.state.pipe(
			map(t => t)
		);
	}

	/**
	 * Verifica o tamanho da tela.
	 * @returns True se o tamanho da tela for menor que 767.
	 */
	public check(): void {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent) || window.innerWidth <= 767)
			this.subject.next(true);
		else
			this.subject.next(false);
	}
}
