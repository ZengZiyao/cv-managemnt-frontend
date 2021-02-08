import { Cv } from './../shared/cv';
import { Component, OnInit } from '@angular/core';

const cvId = '5f54c35ec4ddda34dc40b4ed';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  select: boolean;
  exportable: boolean;
  cv: Cv;
  profileReady: boolean;
  awardReady: boolean;
  biographyReady: boolean;
  projectReady: boolean;
  publicationReady: boolean;
  workExperienceReady: boolean;
  membershipReady: boolean;
  academicQualificationReady: boolean;
  courseReady: boolean;
  studentReady: boolean;

  constructor() {}

  ngOnInit(): void {
    this.select = false;
    this.exportable = false;
    this.cv = new Cv();
  }

  receiveMessage($event) {
    this.select = $event;
  }

  cancel() {
    this.ngOnInit();
    this.reset();
  }

  exportCV() {
    this.exportable = !this.exportable;
    if (
      this.profileReady &&
      this.awardReady &&
      this.biographyReady &&
      this.projectReady &&
      this.publicationReady &&
      this.workExperienceReady &&
      this.membershipReady &&
      this.academicQualificationReady &&
      this.courseReady &&
      this.studentReady
    ) {
      console.log(this.cv);
    }

    this.reset();
  }

  receiveReadyMessage($event, name: string) {
    switch (name) {
      case 'profile':
        this.profileReady = $event;
        break;
      case 'award':
        this.awardReady = $event;
        break;
      case 'biography':
        this.biographyReady = $event;
        break;
      case 'project':
        this.projectReady = $event;
        break;
      case 'publication':
        this.publicationReady = $event;
        break;
      case 'work experience':
        this.workExperienceReady = $event;
        break;
      case 'membership':
        this.membershipReady = $event;
        break;
      case 'academic qualification':
        this.academicQualificationReady = $event;
        break;
      case 'course':
        this.courseReady = $event;
        break;
      case 'student':
        this.studentReady = $event;
        break;
    }
  }

  reset() {
    this.profileReady = false;
    this.awardReady = false;
    this.biographyReady = false;
    this.profileReady = false;
    this.publicationReady = false;
    this.workExperienceReady = false;
    this.membershipReady = false;
    this.academicQualificationReady = false;
    this.courseReady = false;
    this.studentReady = false;
    this.cv = new Cv();
  }
}
