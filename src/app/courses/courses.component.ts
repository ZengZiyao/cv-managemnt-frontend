import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../shared/course';
import { Cv } from '../shared/cv';
import { CourseService } from "../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ["courseCode", "courseTitle", "academicYear", "courseLevel", "courseType", "semester", "edit"]
  @Output() messageEvent = new EventEmitter<boolean>();

  courses: Course[];
  allSelected: boolean = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  private _select: boolean;
  @Input()
  cv: Cv;
  @Input("select")
  set select(select: boolean) {
    this._select = select;
    if (this._select) {
      this.displayedColumns = ["selectCol", "courseCode", "courseTitle", "academicYear", "courseLevel", "courseType", "semester", "edit"];
    } else {
      this.displayedColumns = ["courseCode", "courseTitle", "academicYear", "courseLevel", "courseType", "semester", "edit"];
    }
  }
  get select(): boolean {
    return this._select
  }
  @Input("exportable")
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (this.selected.indexOf(true) > -1) {
      this.cv.courses = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.courses.push(this.courses[i]);
        }
      }
      console.log(this.cv.courses);

    }
    this.emitMessage();

  }
  get exportable(): boolean {
    return this._exportable;}

  constructor(private dialog: MatDialog, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      for (let i = 0; i < this.courses.length; i++) {
        this.selected.push(false);
      }

    });
  }

  openDialog(course?: Course) {
    const dialogConfig = new MatDialogConfig();

 
      dialogConfig.data = course;
    

    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit()

      }
    )
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id).subscribe(() => this.ngOnInit());
  }
  
  emitMessage() {
    this.messageEvent.emit(true);
  }

  updateAllSelected(selected: boolean, i: number) {
    this.selected[i] = selected;
    this.allSelected = this.selected.every((i) => i);
  }

  someSelected():boolean {
    return this.selected.indexOf(true) > -1 && this.selected.indexOf(false) > -1;
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.selected.fill(selected) 
  }


}
