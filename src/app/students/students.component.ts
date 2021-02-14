import { Student } from './../shared/student';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cv } from '../shared/cv';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  displayedColumns: string[] = [
    'No.',
    'student',
    'period',
    'role',
    'title',
    'status',
    'edit',
  ];
  masterStudents: Student[] = [];
  phdStudents: Student[] = [];
  students: Student[] = [];
  masterAllSelected: boolean = false;
  masterSelected: boolean[] = [];
  phdAllSelected: boolean = false;
  phdSelected: boolean[] = [];

  private _exportable: boolean;
  private _select: boolean;
  @Input()
  cv: Cv;
  @Input()
  set select(select: boolean) {
    this._select = select;
    if (this._select) {
      this.displayedColumns = [
        'selectCol',
        'No.',
        'student',
        'period',
        'role',
        'title',
        'status',
        'edit',
      ];
    } else {
      this.displayedColumns = [
        'No.',
        'student',
        'period',
        'role',
        'title',
        'status',
        'edit',
      ];
    }
  }
  get select(): boolean {
    return this._select;
  }

  @Input('exportable')
  set exportable(exportable: boolean) {
    this._exportable = exportable;

    if (exportable && this.masterSelected.indexOf(true) > -1) {
      this.cv.masterStudents = [];
      for (let i = 0; i < this.masterSelected.length; i++) {
        if (this.masterSelected[i]) {
          this.cv.masterStudents.push(this.masterStudents[i]);
        }
      }
    }

    if (this.phdSelected.indexOf(true) > -1) {
      this.cv.phdStudents = [];
      for (let i = 0; i < this.phdSelected.length; i++) {
        if (this.phdSelected[i]) {
          this.cv.phdStudents.push(this.phdStudents[i]);
        }
      }
    }

    if (exportable) {
      this.emitMessage();

    } else {
      this.phdSelected.fill(false);
      this.masterSelected.fill(false);
      this.phdAllSelected = false;
      this.masterAllSelected = false;
    }
  }
  get exportable(): boolean {
    return this._exportable;
  }

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentService.getMasterStudents().subscribe((data) => {
      this.masterStudents = data;
      this.masterStudents.forEach((e) => this.masterSelected.push(false));
    });
    this.studentService.getPhdStudents().subscribe((data) => {
      this.phdStudents = data;
      this.phdStudents.forEach((e) => this.phdSelected.push(false));
    });
  }

  openDialog(type: number, student?: Student) {
    const dialogConfig = new MatDialogConfig();

    if (student === undefined) {
      student = new Student();
      if (type === 0) {
        student.type = "master";
      } else if (type === 1) {
        student.type = "phd";
      }
    }
    dialogConfig.data = student;

    dialogConfig.width = '40%';

    const dialogRef = this.dialog.open(StudentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteStudent(student: Student) {
    this.studentService
      .deleteStudent(student.id)
      .subscribe(() => this.ngOnInit());
  }

  emitMessage() {
    this.messageEvent.emit(true);
  }

  updateAllSelected(selected: boolean, i: number, type: number) {
    if (type === 0) {
      this.masterSelected[i] = selected;
      this.masterAllSelected = this.masterSelected.every((i) => i);
    } else if (type === 1) {
      this.phdSelected[i] = selected;
      this.phdAllSelected = this.phdSelected.every((i) => i);
    }
  }

  someSelected(type: number): boolean {
    if (type === 0) {
      return (
        this.masterSelected.indexOf(true) > -1 &&
        this.masterSelected.indexOf(false) > -1
      );
    } else if (type === 1) {
      return (
        this.phdSelected.indexOf(true) > -1 &&
        this.phdSelected.indexOf(false) > -1
      );
    }
    return false;
  }

  setAll(selected: boolean, type: number) {
    if (type === 0) {
      this.masterAllSelected = selected;
      this.masterSelected.fill(selected);
    } else if (type === 1) {
      this.phdAllSelected = selected;
      this.phdSelected.fill(selected);
    }
  }
}
