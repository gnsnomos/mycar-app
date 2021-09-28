export interface IJourneyDialogData {
    journey: Partial<IJourney>;
    enableDelete: boolean;
}

export interface IJourneyDialogResult {
    journey: IJourney;
    delete?: boolean;
}

export interface IJourney {
    id?: string;
    to: string;
    currentKlm: number;
    date: number;
}

export interface IEditJourney {
    id?: string;
    to: string;
    currentKlm: number;
    date: Date;

    getDateForSaving(): number;
    saveData(): IJourney;
}

export class JourneyDialogData implements IJourneyDialogData {
    journey: Partial<IJourney>;
    editJourney: Partial<IEditJourney>;
    enableDelete: boolean;

    constructor(data: IJourneyDialogData) {
        this.journey = data.journey;
        this.editJourney = new EditJourney(data.journey);
        this.enableDelete = data.enableDelete;
    }
}

export class EditJourney implements Partial<IEditJourney> {
    id?: string;
    to: string;
    currentKlm: number;
    date: Date;

    constructor(journey: Partial<IJourney>) {
        this.id = journey.id;
        this.to = journey.to;
        this.currentKlm = journey.currentKlm ? journey.currentKlm * 1 : 0;
        this.date = (journey.date ? new Date(journey.date * 1000) : new Date());
    }

    getDateForSaving(): number {
        return Math.trunc(this.date.getTime() / 1000);
    }

    saveData(): IJourney {
        const result: IJourney = {
            to: this.to,
            currentKlm: this.currentKlm * 1,
            date: this.getDateForSaving()
        };

        if (this.id) {
            result.id = this.id;
        }

        return result;
    }
}