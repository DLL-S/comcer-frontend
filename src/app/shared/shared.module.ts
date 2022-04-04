import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginaEmConstrucaoComponent } from "./pages/pagina-em-construcao/pagina-em-construcao.component";
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FileUploadComponent } from './utils/components/file-upload/file-upload.component';
import { ClickStopPropagationDirective } from "./utils/directives/click-stop-propagation.directive";

@NgModule({
	declarations: [
		PaginaEmConstrucaoComponent,
		PaginaNaoEncontradaComponent,
		ClickStopPropagationDirective,
		FileUploadComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatTooltipModule,
	],
	exports: [
		PaginaEmConstrucaoComponent,
		PaginaNaoEncontradaComponent,
		ClickStopPropagationDirective,
		FileUploadComponent
	]
})
export class SharedModule { }
