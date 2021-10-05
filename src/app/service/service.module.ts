import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { UpcomingServiceComponent } from './upcoming-service/upcoming-service.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
    ],
    declarations: [
        UpcomingServiceComponent,
        ServiceDialogComponent
    ],
    entryComponents: [
        ServiceDialogComponent
    ],
    exports: [UpcomingServiceComponent],
})
export class ServiceModule { }
