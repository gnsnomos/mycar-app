import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJourneyDialogData, JourneyDialogData } from '../journey.model';

@Component({
  selector: 'app-journey-dialog',
  templateUrl: './journey-dialog.component.html',
  styleUrls: ['./journey-dialog.component.scss']
})
export class JourneyDialogComponent {
  public journeyData: Partial<IJourneyDialogData> = new JourneyDialogData(this.data);

  constructor(
    private dialogRef: MatDialogRef<JourneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJourneyDialogData
  ) { }

  cancel(): void {
    if (this.data) {
      this.data.journey.to = this.journeyData.journey.to;
      this.data.journey.currentKlm = this.journeyData.journey.currentKlm;
      this.data.journey.date = this.journeyData.journey.date;
      this.dialogRef.close(this.data);
    }
  }

}
