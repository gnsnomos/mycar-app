import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IServiceDialogData, ServiceDialogData } from '../service.model';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html'
})
export class ServiceDialogComponent {
  public serviceData: Partial<ServiceDialogData> = new ServiceDialogData(this.data);

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
