import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
	selector: 'app-acesso-negado',
	templateUrl: './acesso-negado.component.html',
	styleUrls: ['./acesso-negado.component.css']
})
export class AcessoNegadoComponent implements OnInit {

	constructor(private titleService: TitleService) {
		this.titleService.setTitle("Acesso negado");
	}

	ngOnInit(): void {
	}

}
