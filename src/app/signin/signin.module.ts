import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
