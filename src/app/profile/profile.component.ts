import { ProfileService } from './../services/profile.service';
import { Profile } from './../shared/profile';
import { ProfileDialogComponent } from './../profile-dialog/profile-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Cv } from './../shared/cv';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Profile;

  constructor(private dialog: MatDialog, private profileService: ProfileService) { 
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((profile) => this.profile = profile
    );
  }

  openDialog(profile: Profile) {
    const dialogConfig = new MatDialogConfig();

      dialogConfig.data = profile;
    
    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(ProfileDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();  
  });
}

}
