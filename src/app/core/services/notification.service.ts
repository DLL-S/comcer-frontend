import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor (private snackBarService: MatSnackBar) { }

    exibir(mensagem: string, label: string = "X") {
        this.snackBarService.open(mensagem, label, {
            duration: 3.8 * 1000,
            horizontalPosition: "center",
            verticalPosition: "bottom"
        });
    }
}
