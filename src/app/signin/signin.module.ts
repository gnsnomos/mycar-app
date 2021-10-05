import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { SignInComponent } from './signin.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [
        SignInComponent,
    ],
    entryComponents: [
        SignInComponent
    ],
    exports: [SignInComponent],
})
export class SignInModule { }
