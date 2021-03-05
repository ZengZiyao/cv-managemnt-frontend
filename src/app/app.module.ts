import { ProjectService } from './services/project.service';
import { MembershipService } from './services/membership.service';
import { JournalService } from './services/journal.service';
import { CourseService } from './services/course.service';
import { ConferenceService } from './services/conference.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { WorkExperienceService } from './services/work-experience.service';
import { PublicationService } from './services/publication.service';
import { BiographyService } from './services/biography.service';
import { ProfileService } from './services/profile.service';
import { AwardService } from './services/award.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CvComponent } from './cv/cv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ProfileComponent } from './profile/profile.component';
import { BiographyComponent } from './biography/biography.component';
import { AwardsComponent } from './awards/awards.component';
import { PublicationsComponent } from './publications/publications.component';
import { WorkExperiencesComponent } from './work-experiences/work-experiences.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { BiographyDialogComponent } from './biography-dialog/biography-dialog.component';
import { WorkExperienceDialogComponent } from './work-experience-dialog/work-experience-dialog.component';
import { AwardDialogComponent } from './award-dialog/award-dialog.component';
import { PublicationDialogComponent } from './publication-dialog/publication-dialog.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { NavbarJournalDialogComponent } from './navbar-journal-dialog/navbar-journal-dialog.component';
import { NavbarConferenceDialogComponent } from './navbar-conference-dialog/navbar-conference-dialog.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { MembershipDialogComponent } from './membership-dialog/membership-dialog.component';
import { AcademicQualificationsComponent } from './academic-qualifications/academic-qualifications.component';
import { AcademicQualificationDialogComponent } from './academic-qualification-dialog/academic-qualification-dialog.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { StudentsComponent } from './students/students.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { StudentService } from './services/student.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ComponentDialogComponent } from './component-dialog/component-dialog.component';
import { ConnectionDialogComponent } from './connection-dialog/connection-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    ProfileComponent,
    BiographyComponent,
    AwardsComponent,
    PublicationsComponent,
    WorkExperiencesComponent,
    ProfileDialogComponent,
    BiographyDialogComponent,
    WorkExperienceDialogComponent,
    AwardDialogComponent,
    PublicationDialogComponent,
    AuthorsInputComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDialogComponent,
    NavbarJournalDialogComponent,
    NavbarConferenceDialogComponent,
    MembershipsComponent,
    MembershipDialogComponent,
    AcademicQualificationsComponent,
    AcademicQualificationDialogComponent,
    CoursesComponent,
    CourseDialogComponent,
    StudentsComponent,
    StudentDialogComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    ComponentDialogComponent,
    ConnectionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectCountryModule.forRoot('en'),
    MatTableModule,
    MatSortModule,
  ],
  providers: [
    AwardService,
    BiographyService,
    ConferenceService,
    CourseService,
    JournalService,
    MembershipService,
    ProfileService,
    ProjectService,
    PublicationService,
    StudentService,
    WorkExperienceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ProfileComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
