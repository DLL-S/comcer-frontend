import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormService } from "@ng-dynamic-forms/core";
import { DialogService } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-base-form-dialog',
	templateUrl: './base-form-dialog.component.html',
	styleUrls: [ './base-form-dialog.component.css' ]
})
export class BaseFormDialogComponent implements OnInit {

	@Input() titulo: string;

	constructor (public dialogService: DialogService, private formService: DynamicFormService) { }

	ngOnInit(): void {
	}

}
