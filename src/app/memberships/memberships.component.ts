import { MembershipService } from './../services/membership.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Membership } from '../shared/membership';
import { MembershipDialogComponent } from '../membership-dialog/membership-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cv } from '../shared/cv';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss'],
})
export class MembershipsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();

  memberships: Membership[];
  allSelected: boolean = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input()
  hasMembership: boolean;
  @Input('exportable')
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (exportable && this.selected.indexOf(true) > -1) {
      this.cv.memberships = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.memberships.push(this.memberships[i]);
        }
      }
      console.log(this.cv.memberships);
    }
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
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {
    if (this.hasMembership) {
      this.membershipService.getAllMemberships().subscribe((data) => {
        this.memberships = data;
        for (let i = 0; i < this.memberships.length; i++) {
          this.selected.push(false);
        }
      });
    }
  }

  openDialog(membership?: Membership) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = membership;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(MembershipDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteMembership(membership: Membership) {
    this.membershipService
      .deleteMembership(membership.id)
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
