import { Author } from './../shared/author';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss']
})
export class AuthorsInputComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  @Input() authors: Author[];
  @Output() authorsEvent = new EventEmitter<Author[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      value.split(",").forEach((e) => {
        e = e.trim();
        let author : Author = new Author();
        if (e.endsWith("**")) {
          author.fellow = true;
          author.name = e.slice(0, -2)
        } else if (e.endsWith("*")) {
          author.student = true;
          author.name = e.slice(0, -1);
        } else {
          author.name = e;
        }
        this.authors.push(author);
        this.updateAuthors(this.authors);
      })
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(author: Author): void {
    const index = this.authors.indexOf(author);

    if (index >= 0) {
      this.authors.splice(index, 1);
    }
  }

updateAuthors(authors: Author[]) {
  this.authorsEvent.emit(authors);
}

}
