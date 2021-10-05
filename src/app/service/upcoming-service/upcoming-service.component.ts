import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JourneyService } from 'src/app/journey/journey.service';
import { IService, IServiceDialogResult, Services } from '../service.model';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IJourney } from 'src/app/journey/journey.model';

@Component({
  selector: 'app-upcoming-service',
  templateUrl: './upcoming-service.component.html',
  styleUrls: ['./upcoming-service.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UpcomingServiceComponent implements OnInit {

  services: MatTableDataSource<any> = new MatTableDataSource([]);
  expandedElement = null;
  displayedColumns: string[] = ['type', 'nextService', 'date', 'cost', 'edit'];

  private readonly serviceTypes = [Services.tyres, Services.oil, Services.oilFilter, Services.gasolineFilter, Services.sparkPlug, Services.transmissionBand, Services.breaks];
  private editDialogOpen = false;
  private itemToBeDeleted = null;
  private lastJourney: IJourney;

  constructor(private dialog: MatDialog, private journeyService: JourneyService) { }

  async ngOnInit(): Promise<void> {
    this.getLatestServices();

    this.journeyService.latestJourney$.subscribe(journey => {
      this.lastJourney = journey;
    });
  }

  newService(): void {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '270px',
      data: {
        service: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: IServiceDialogResult) => {
        if (!result || !result.service.type) {
          return;
        }
        this.journeyService.saveService(result.service);
      });
  }

  editService(service: IService): void {
    this.editDialogOpen = true;

    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '270px',
      data: {
        service,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: IServiceDialogResult) => {
      this.editDialogOpen = false;
      if (!result || !result.service.id) {
        return;
      }
      if (result.delete) {
        this.itemToBeDeleted = service.id;
        this.journeyService.deleteService(service.id);
      } else {
        this.journeyService.updateService(service.id, result.service);
      }
    });
  }

  tableRowClicked(isAlreadyExpanded: boolean): boolean {
    if (this.editDialogOpen) {
      return true;
    }
    return isAlreadyExpanded;
  }

  private getLatestServices(): void {
    const observables = [];

    this.serviceTypes.forEach(type => {
      observables.push(
        this.journeyService.getServiceByType(type)
      );
    });


    // @TODO: Find a way to combine all observables output to an array in order to remove the 'if' block inside 'subscribe'
    merge(...observables).pipe(
      filter((service: IService[]) => service.length > 0),
      map((service: IService[]) => service[0])
    ).subscribe((service: IService) => {
      let indexToRemove = -1;

      // If table has contents
      if (this.services.data.length > 0) {

        // Check if same row already exists
        indexToRemove = this.services.data.findIndex((arrService: IService) => this.checkIfElementExists(service, arrService));
        if (this.itemToBeDeleted) {
          this.itemToBeDeleted = null;
        }
        if (indexToRemove > -1) {
          this.services.data.splice(indexToRemove, 1);
        }
      }

      this.calculateNextService(service);

      this.services.data.push(service);

      // Update the UI
      this.services.data = [...this.services.data];
    });
  }

  private checkIfElementExists(service: IService, arrService: IService): boolean {
    // First we check if the current element is the deleted one
    // Then we check if current service has the same id as the incoming
    // Finally we check if types are the same and current service's date is newer than the incoming
    return this.itemToBeDeleted === arrService?.id || arrService?.id === service?.id || (arrService.type === service.type && arrService.date < service.date)
  }

  private calculateNextService(service: IService): void {
    const serviceConfiguration = this.journeyService.getDefaultService()[service.type];
    if (serviceConfiguration.kilometers) {

      service.nextService = (serviceConfiguration.kilometers * 1) + this.lastJourney.currentKlm + '';
    }
  }

}
