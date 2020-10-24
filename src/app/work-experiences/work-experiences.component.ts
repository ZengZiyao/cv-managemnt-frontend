import { WorkExperienceService } from './../services/work-experience.service';
import { WorkExperience } from './../shared/work-experience';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PublicationDialogComponent } from '../publication-dialog/publication-dialog.component';
import { WorkExperienceDialogComponent } from '../work-experience-dialog/work-experience-dialog.component';

@Component({
  selector: 'app-work-experiences',
  templateUrl: './work-experiences.component.html',
  styleUrls: ['./work-experiences.component.scss']
})
export class WorkExperiencesComponent implements OnInit {
  workExperiences: WorkExperience[];

  constructor(private dialog: MatDialog, private workExperienceService: WorkExperienceService) { }

  ngOnInit(): void {
    this.workExperienceService.getAllWorkExperience().subscribe((data) => this.workExperiences = data);
  }

  openDialog(workExperience?: WorkExperience) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = workExperience;

    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(WorkExperienceDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();

      }
    )
  }

  deleteWorkExperience(workExperience: WorkExperience) {
    this.workExperienceService.deleteWorkExperience(workExperience.id).subscribe(() => this.ngOnInit());
  }

}
