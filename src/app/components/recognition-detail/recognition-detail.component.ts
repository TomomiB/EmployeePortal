import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recognition-detail',
  templateUrl: './recognition-detail.component.html',
  styleUrls: ['./recognition-detail.component.css']
})
export class RecognitionDetailComponent {

  public recognition: any = {};

  constructor(
    dialogRef: MatDialogRef<RecognitionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recognition = data.recognition;
    console.log('opened dialog: ', this.recognition)
  }
}
