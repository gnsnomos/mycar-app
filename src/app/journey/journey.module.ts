import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JourneyDialogComponent } from './journey-dialog/journey-dialog.component';
import { JourneyComponent } from './journey.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        JourneyComponent,
        JourneyDialogComponent,
    ],
    entryComponents: [
        JourneyDialogComponent
    ],
    exports: [JourneyComponent],
})
export class JourneyModule { }
