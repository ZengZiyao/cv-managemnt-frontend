import { ProjectDialogComponent } from './../project-dialog/project-dialog.component';
import { ProjectService } from './../services/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from './../shared/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects:  Project[];

  constructor(private dialog: MatDialog, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data) => this.projects = data)
  }

  openDialog(project ?: Project) {
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.data = project;

    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id).subscribe(() => this.ngOnInit())
  }

}
