import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IServiceDialogData, ServiceDialogData, Services } from '../service.model';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html'
})
export class ServiceDialogComponent {
  serviceData: Partial<ServiceDialogData> = new ServiceDialogData(this.data);

  services: Services[] = [
    Services.tyres,
    Services.oil,
    Services.oilFilter,
    Services.gasolineFilter,
    Services.sparkPlug,
    Services.transmissionBand,
    Services.breaks
  ];

  constructor(
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IServiceDialogData
  ) { }

  cancel(): void {
    if (this.data) {
      this.data.service.type = this.serviceData.service.type;
      this.data.service.cost = this.serviceData.service.cost;
      this.data.service.currentKlm = this.serviceData.service.currentKlm;
      this.data.service.date = this.serviceData.service.date;
      this.dialogRef.close(this.data);
    }
  }

}
