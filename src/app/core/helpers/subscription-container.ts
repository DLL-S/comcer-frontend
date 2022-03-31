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
		let x = 0;
		this.subs.forEach(sub => {
			x++;
			console.log("Destruindo subscription: ", x);
			sub.unsubscribe();
		});
	}
}
