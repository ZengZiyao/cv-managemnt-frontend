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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

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
import { NarbarDialogComponent } from './narbar-dialog/narbar-dialog.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

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
    NarbarDialogComponent,
    ProjectsComponent,
    ProjectDialogComponent
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
    MatMenuModule
  ],
  providers: [
    AwardService,
    ProfileService,
    BiographyService,
    PublicationService,
    WorkExperienceService
  ],
  entryComponents: [
    ProfileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
