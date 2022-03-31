import { Subscription } from "rxjs";

/**
 * Classe padrão para o gerenciamento de subscriptions de componentes.
 */
export class SubscriptionContainer {

	/**
	 * Array de subscriptions do componente.
	 */
	private subs = Array<Subscription>();

	/**
	 * Adiciona uma nova subscription ao container.
	 */
	set add(sub: Subscription) {
		this.subs.push(sub);
	}

	/**
	 * Faz unsubscribe de todas as subscriptions do container.
	 */
	dispose() {
		this.subs.forEach(sub => sub.unsubscribe());
	}
}
