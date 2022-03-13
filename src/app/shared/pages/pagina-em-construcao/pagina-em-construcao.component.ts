import { Component, OnInit } from '@angular/core';
import { TitleService } from "src/app/core/services/title.service";

@Component({
    selector: 'app-pagina-em-construcao',
    templateUrl: './pagina-em-construcao.component.html',
    styleUrls: [ './pagina-em-construcao.component.css' ]
})
export class PaginaEmConstrucaoComponent implements OnInit {

    constructor (private titleService: TitleService) {
        this.titleService.setTitle("Em construção", "/", "Página em construção");
    }

    ngOnInit(): void {
    }

}
