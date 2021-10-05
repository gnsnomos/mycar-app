export interface IServiceDialogData {
    service: Partial<IService>;
    enableDelete: boolean;
}

export interface IServiceDialogResult {
    service: IService;
    delete?: boolean;
}

export interface IService {
    id?: string;
    cost: number;
    date: number;
    currentKlm: number;
    type: string;
    nextService?: string
}

export interface IEditService {
    id?: string;
    type: string;
    currentKlm: number;
    date: Date;
    cost: number;

    getDateForSaving(): number;
    saveData(): IService;
}

interface ServiceData {
    kilometers?: number;
    date?: string;
}

export interface ServiceConfiguration {
    tyres: ServiceData;
    oil: ServiceData;
    'oil-filter': ServiceData;
    'gasoline-filter': ServiceData;
    'spark-plug': ServiceData;
    'transmission-band': ServiceData;
    breaks: ServiceData;
}

export enum Services {
    tyres = 'tyres',
    oil = 'oil',
    oilFilter = 'oil-filter',
    gasolineFilter = 'gasoline-filter',
    sparkPlug = 'spark-plug',
    transmissionBand = 'transmission-band',
    breaks = 'breaks'
}

export class ServiceDialogData implements IServiceDialogData {
    service: Partial<IService>;
    editService: Partial<IEditService>;
    enableDelete: boolean;

    constructor(data: IServiceDialogData) {
        this.service = data.service;
        this.editService = new EditService(data.service);
        this.enableDelete = data.enableDelete;
    }
}

export class EditService implements Partial<IEditService> {
    id?: string;
    type: string;
    currentKlm: number;
    date: Date;
    cost: number;

    constructor(service: Partial<IService>) {
        this.id = service.id;
        this.type = service.type;
        this.cost = service.cost;
        this.currentKlm = service.currentKlm ? service.currentKlm * 1 : 0;
        this.date = (service.date ? new Date(service.date * 1000) : new Date());
    }

    getDateForSaving(): number {
        return Math.trunc(this.date.getTime() / 1000);
    }

    saveData(): IService {
        const result: IService = {
            type: this.type,
            cost: this.cost,
            currentKlm: this.currentKlm * 1,
            date: this.getDateForSaving()
        };

        if (this.id) {
            result.id = this.id;
        }

        return result;
    }
}