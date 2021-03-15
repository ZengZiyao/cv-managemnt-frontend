import { ProjectDialogComponent } from './../project-dialog/project-dialog.component';
import { ProjectService } from './../services/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from './../shared/project';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cv } from '../shared/cv';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  displayedColumns: string[] = [
    'role',
    'year',
    'title',
    'amount',
    'funder',
    'type',
    'edit',
  ];
  projects: Project[];
  allSelected: boolean = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  private _hasProject: boolean;
  private _select: boolean;
  @Input()
  set select(select: boolean) {
    this._select = select;
    if (this._select) {
      this.displayedColumns = [
        'selectCol',
        'role',
        'year',
        'title',
        'amount',
        'funder',
        'type',
        'edit',
      ];
    } else {
      this.displayedColumns = [
        'role',
        'year',
        'title',
        'amount',
        'funder',
        'type',
        'edit',
      ];
    }
  }
  get select(): boolean {
    return this._select;
  }
  @Input()
  cv: Cv;
  @Input('hasProject')
  set hasProject(hasProject: boolean) {
    this._hasProject = hasProject;
    this.ngOnInit();
  }
  get hasProject(): boolean {
    return this._hasProject;
  }
  @Input('exportable')
  set exportable(exportable: boolean) {
    if (exportable && this.selected.indexOf(true) > -1) {
      this.cv.projects = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.projects.push(this.projects[i]);
        }
      }
    }
    this._exportable = exportable;
    if (exportable) {
      this.emitMessage();
    } else {
      this.selected.fill(false);
      this.allSelected = false;
    }
  }
  get exportable(): boolean {
    return this._exportable;
  }

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.hasProject) {
      this.projectService.getAllProjects().subscribe((data) => {
        this.projects = data;
        for (let i = 0; i < this.projects.length; i++) {
          this.selected.push(false);
        }
      });
    }
  }

  openDialog(project?: Project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = project;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteProject(project: Project) {
    this.projectService
      .deleteProject(project.id)
      .subscribe(() => this.ngOnInit());
  }

  emitMessage() {
    this.messageEvent.emit(true);
  }

  updateAllSelected(selected: boolean, i: number) {
    this.selected[i] = selected;
    this.allSelected = this.selected.every((i) => i);
  }

  someSelected(): boolean {
    return (
      this.selected.indexOf(true) > -1 && this.selected.indexOf(false) > -1
    );
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.selected.fill(selected);
  }
}
