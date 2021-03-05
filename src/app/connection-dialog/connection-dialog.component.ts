import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from './../services/connection.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss'],
})
export class ConnectionDialogComponent implements OnInit {
  connectionForm: FormGroup;
  username: string;
  @ViewChild('cform') ConnectionDirective;

  constructor(
    private dialogRef: MatDialogRef<ConnectionDialogComponent>,
    private connectionService: ConnectionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.connectionForm = this.fb.group({
      username: [this.username, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.connectionForm.valid) {
      this.connectionService
        .requestConnection(this.connectionForm.value.username)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }
}
