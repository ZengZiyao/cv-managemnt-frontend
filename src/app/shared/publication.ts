import { Journal } from './journal';
import { Author } from './author';

export class Publication {
    id: string;
    authors: Author[] = [];
    date: Date;
    journal: Journal = new Journal();
    page: string;
    tier: string;
    title: string;
}