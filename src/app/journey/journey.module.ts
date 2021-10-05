import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { JourneyDialogComponent } from './journey-dialog/journey-dialog.component';
import { JourneyComponent } from './journey.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule
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
