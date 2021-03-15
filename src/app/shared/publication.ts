import { PubType } from './pubType';
import { PubSource } from './pubSource';
import { Author } from './author';

export class Publication {
  id: string;
  authors: Author[] = [];
  date: Date;
  page: string;
  tier: string;
  title: string;
  pubSource: PubSource = new PubSource();
  type: PubType;
  country: string;
}
