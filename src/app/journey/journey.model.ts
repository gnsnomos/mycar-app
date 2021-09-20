export interface Journey {
    id?: string;
    to: string;
    currentKlm: number;
    fuelAmount?: number;
    fuelCost?: number;
    remainingKlm?: number;
    date: Date;
}