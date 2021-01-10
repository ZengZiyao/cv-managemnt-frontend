import { Journal } from './journal';
import { Author } from './author';

export class Publication {
    id: string;
    authors: Author[] = [];
    date: Date;
    page: string;
    tier: string;
    title: string;
    journalId: string;
    journalName: string;
}