import { Status } from './../shared/status';
import { StatusService } from './../services/status.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-component-dialog',
  templateUrl: './component-dialog.component.html',
  styleUrls: ['./component-dialog.component.scss'],
})
export class ComponentDialogComponent implements OnInit {
  status: Status;
  constructor(
    private dialogRef: MatDialogRef<ComponentDialogComponent>,
    private statusService: StatusService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.status = data;
  }

  ngOnInit(): void {}

  save() {
    this.statusService
      .updateStatus(this.status.id, this.status)
      .subscribe(() => {
        this.dialogRef.close();
        location.reload();
      });
  }

  toggleSelected(name: string) {
    this.status[name] = !this.status[name];
  }
}
