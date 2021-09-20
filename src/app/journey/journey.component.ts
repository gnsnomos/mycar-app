import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { JourneyDialogComponent } from './journey-dialog/journey-dialog.component';
import { IJourney, IJourneyDialogResult } from './journey.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
export class JourneyComponent {

  private readonly firebaseCollectionName = 'journeys';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['to', 'currentKlm', 'date', 'edit'];
  journeys$ = this.store.collection(this.firebaseCollectionName, ref => ref.orderBy('date')).valueChanges({ idField: 'id' }) as Observable<IJourney[]>;
  journeys: MatTableDataSource<any> = null;

  private editDialogOpen = false;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
    this.journeys$.subscribe(journeys => {
      this.journeys = new MatTableDataSource(journeys);
      this.journeys.paginator = this.paginator;
    });
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
      .subscribe((result: IJourneyDialogResult) => {
        if (!result || !result.journey.to) {
          return;
        }
        this.store.collection(this.firebaseCollectionName).add(result.journey);
      });
  }

  editJourney(journey: IJourney): void {
    this.editDialogOpen = true;
    const dialogRef = this.dialog.open(JourneyDialogComponent, {
      width: '270px',
      data: {
        journey,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: IJourneyDialogResult) => {
      this.editDialogOpen = false;
      if (!result || !result.journey.id) {
        return;
      }
      if (result.delete) {
        this.store.collection(this.firebaseCollectionName).doc(journey.id).delete();
      } else {
        this.store.collection(this.firebaseCollectionName).doc(journey.id).update(result.journey);
      }
    });
  }

  tableRowClicked(isAlreadyExpanded: boolean): boolean {
    if (this.editDialogOpen) {
      return true;
    }
    return isAlreadyExpanded;
  }
}

