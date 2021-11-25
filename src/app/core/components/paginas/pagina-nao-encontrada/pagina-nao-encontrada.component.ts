import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
	selector: 'app-pagina-nao-encontrada',
	templateUrl: './pagina-nao-encontrada.component.html',
	styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

	constructor(private titleService: TitleService) {
		this.titleService.setTitle("Página não encontrada");
	}

	ngOnInit(): void { }

}
