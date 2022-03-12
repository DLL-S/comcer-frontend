import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { BaseGuard } from "./helpers/base.guard";
import { ErrorInterceptor } from "./helpers/error-interceptor";
import { LoginService } from "./services/login.service";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
    declarations: [
        LoginComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSnackBarModule
    ],
    exports: [
        LoginComponent,
        HeaderComponent
    ],
    providers: [
        httpInterceptorProviders,
        LoginService,
        BaseGuard
    ]
})
export class CoreModule { }
