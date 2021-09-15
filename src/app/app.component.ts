import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JourneyDialogComponent, JourneyDialogResult } from './journey-dialog/journey-dialog.component';
import { Journey } from './journey/journey.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dialog: MatDialog) {

  }

  journeys: Journey[] = [
    {
      to: 'Spiti',
      currentKlm: 121233
    },
    {
      to: 'Douleia',
      currentKlm: 121310
    }
  ];

  newTask(): void {
    const dialogRef = this.dialog.open(JourneyDialogComponent, {
      width: '270px',
      data: {
        journey: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: JourneyDialogResult) => {
        if (result) { this.journeys.push(result.journey); }
      });
  }

  editJourney(journey: Journey): void {
    const dialogRef = this.dialog.open(JourneyDialogComponent, {
      width: '270px',
      data: {
        journey,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: JourneyDialogResult) => {
      const journeyIndex = this.journeys.indexOf(journey);
      if (result.delete) {
        this.journeys.splice(journeyIndex, 1);
      } else {
        this.journeys[journeyIndex] = journey;
      }
    });
  }
}
