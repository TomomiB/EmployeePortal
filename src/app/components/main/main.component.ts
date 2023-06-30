import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppCacheService } from 'src/app/service/app-cache.service';
import { PortalService } from 'src/app/service/portal-service.service';
import { RecognitionDetailComponent } from '../recognition-detail/recognition-detail.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public displayRecognition: boolean = false;
  public displayPreviousRecognition: boolean = false;
  public displaySupervisorMenu: boolean = false;
  public recognitions: any[] = [];
  public previousRecognitions: any[] = [];
  public notifications: any[] = [];

  public constructor(
    public appCache: AppCacheService,
    public portalService: PortalService,
    public dialog: MatDialog,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.portalService.getMyTeamNotification(this.appCache.currentUser.id).subscribe(results => {
      if (results.statusCode === 200) {
        const JSONResult = JSON.parse(results.body);
        if (JSONResult.Count > 0) {
          this.displaySupervisorMenu = true;
          this.notifications = JSONResult.Items;
        }
        console.log(this.notifications)
      }
    });

    this.portalService.getMyRecognition(this.appCache.currentUser.id).subscribe(results => {
      console.log(results)
      if (results.statusCode === 200) {
        const JSONResult = JSON.parse(results.body);
        if (JSONResult.Count > 0) {
          this.displayRecognition = true;
          this.recognitions = JSONResult.Items;
        }
        console.log(this.recognitions)
      }
    });

    this.portalService.getCurrentUserRecognition(this.appCache.currentUser.id).subscribe(results => {
      console.log(results);
      if (results.statusCode === 200) {
        const JSONResult = JSON.parse(results.body);
        if (JSONResult.Count > 0) {
          this.displayPreviousRecognition = true;
          this.previousRecognitions = JSONResult.Items;
        }
        console.log(this.recognitions)
      }
    });
  }

  public onClickRecognition(): void {
    this.router.navigate(['/recognition']);
  }

  public onClickMyRecognition(recognition: any): void {
    let dialogRef = this.dialog.open(RecognitionDetailComponent, {
      data: { recognition },
      height: '40%',
      width: '60%'
    })

    dialogRef.afterClosed().subscribe(result => {
      dialogRef = result;
    });
  }
}
