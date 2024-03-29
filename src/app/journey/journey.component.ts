import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JourneyDialogComponent } from './journey-dialog/journey-dialog.component';
import { IJourney, IJourneyDialogResult } from './journey.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { JourneyService } from './journey.service';

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['to', 'currentKlm', 'distance', 'date', 'edit'];
  journeys: MatTableDataSource<any> = null;
  expandedElement = null;
  pageIndex = 0;
  pageSize = 5;

  private editDialogOpen = false;

  constructor(private dialog: MatDialog, private journeyService: JourneyService) {
    this.journeyService.read().subscribe(journeys => {
      this.journeys = new MatTableDataSource(journeys);
      this.journeys.paginator = this.paginator;
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(JourneyDialogComponent, {
      width: '270px',
      data: {
        journey: { currentKlm: this.journeys?.data[0]?.currentKlm + 1 },
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: IJourneyDialogResult) => {
        if (!result || !result.journey.to) {
          return;
        }
        this.journeyService.save(result.journey);
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
        this.journeyService.delete(journey.id);
      } else {
        this.journeyService.update(journey.id, result.journey);
      }
    });
  }

  tableRowClicked(isAlreadyExpanded: boolean): boolean {
    if (this.editDialogOpen) {
      return true;
    }
    return isAlreadyExpanded;
  }

  getDistance(row: IJourney, index: number): number {
    if (index === 0 && this.pageIndex === 0) {
      return 0;
    }

    return this.journeys.data[this.getRowIndex(index)].currentKlm - row.currentKlm;
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private getRowIndex(index: number): number {
    return this.pageIndex * this.pageSize + index - 1;
  }
}

