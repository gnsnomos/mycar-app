import { AfterViewInit, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { JourneyDialogComponent, JourneyDialogResult } from './journey-dialog/journey-dialog.component';
import { Journey } from './journey.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class JourneyComponent implements AfterViewInit {

  private readonly firebaseCollectionName = 'journeys';

  displayedColumns: string[] = ['number', 'title', 'edit'];
  journeys$ = this.store.collection(this.firebaseCollectionName).valueChanges({ idField: 'id' }) as Observable<Journey[]>;
  journeys = null;

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }

  ngAfterViewInit(): void {
    this.journeys$.subscribe(journeys => this.journeys = journeys);
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
        if (!result.journey.to) {
          return;
        }
        this.store.collection(this.firebaseCollectionName).add(result.journey);
      });
  }

  editJourney(journey: Journey): void {
    journey.date = new Date();
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
