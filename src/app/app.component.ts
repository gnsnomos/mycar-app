import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { JourneyDialogComponent, JourneyDialogResult } from './journey-dialog/journey-dialog.component';
import { Journey } from './journey/journey.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly firebaseCollectionName = 'journeys';

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
  }

  journeys = this.store.collection(this.firebaseCollectionName).valueChanges({ idField: 'id' }) as Observable<Journey[]>;

  async ngOnInit(): Promise<void> {
    const journeys = await this.journeys;
    console.log(journeys);
  }

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
        if (!result) {
          return;
        }
        this.store.collection(this.firebaseCollectionName).add(result.journey);
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
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(this.firebaseCollectionName).doc(journey.id).delete();
      } else {
        this.store.collection(this.firebaseCollectionName).doc(journey.id).update(journey);
      }
    });
  }
}
