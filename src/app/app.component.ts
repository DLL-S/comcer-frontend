import { Component, HostListener, OnInit } from "@angular/core";
import { PrimeNGConfig } from 'primeng/api';
import { isMobileState } from "./core/services/is-mobile.state";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: [ "./app.component.css" ]
})
export class AppComponent implements OnInit {

	constructor (private primeNgConfig: PrimeNGConfig, private isMobileState: isMobileState) { }

	ngOnInit() {
		this.primeNgConfig.ripple = true;
	}

	@HostListener('window:resize', [ '$event' ])
	onResize() {
		this.isMobileState.check();
	}
}
