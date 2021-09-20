import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Journey } from '../journey.model';

export interface JourneyDialogData {
  journey: Partial<Journey>;
  enableDelete: boolean;
}

export interface JourneyDialogResult {
  journey: Journey;
  delete?: boolean;
}

@Component({
  selector: 'app-journey-dialog',
  templateUrl: './journey-dialog.component.html',
  styleUrls: ['./journey-dialog.component.scss']
})
export class JourneyDialogComponent {
  private backupJourney: Partial<Journey> = { ...this.data.journey };

  constructor(
    private dialogRef: MatDialogRef<JourneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JourneyDialogData
  ) { }

  cancel(): void {
    if (this.data) {
      this.data.journey.to = this.backupJourney.to;
      this.data.journey.currentKlm = this.backupJourney.currentKlm;
      this.data.journey.date = this.backupJourney.date;
      this.dialogRef.close(this.data);
    }
  }

}
