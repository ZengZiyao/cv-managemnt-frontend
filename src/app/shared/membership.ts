import { Country } from '@angular-material-extensions/select-country';
export class Membership {
    id: string;
    startTime: Date;
    endTime: Date;
    designation: string;
    institution: string;
    country: Country;
    state: string;
}