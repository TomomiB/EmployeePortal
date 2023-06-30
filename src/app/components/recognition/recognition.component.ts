import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as uuid from 'uuid'

import { PortalService } from 'src/app/service/portal-service.service';
import { AppCacheService } from 'src/app/service/app-cache.service';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.css']
})
export class RecognitionComponent implements OnInit, OnDestroy {

  public submitted: string = 'not-submitted'; // possible value: 'not-submitted', 'processing', 'submitted'
  public systemMessage = '';
  public recognitionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });


  public constructor(
    public appCache: AppCacheService,
    public portalService: PortalService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    if (this.appCache.employees.length === 0) {
      this.portalService.getEmployees().subscribe(result => {
        const resultJSON = JSON.parse(result.body);
        this.appCache.employees = resultJSON.Items;
        console.log(this.appCache.employees);
      });
    }
  }

  ngOnDestroy(): void {
    this.recognitionForm.reset();
  }

  public onBack(): void {
    if (this.submitted === 'not-submitted' && (
      this.recognitionForm.controls.name.valid ||
      this.recognitionForm.controls.message.valid ||
      this.recognitionForm.controls.category.valid)
    ) {
      // if there is some input in the field, alert the user
      const message = 'You have an unfinished entry on the screen. Are you sure to leave this page?'
      if (confirm(message) === true) {
        this.router.navigate(['/main']);
      }
    } else {
      // not input from the user yet, so go back to the main page
      this.router.navigate(['/main']);
    }
  }

  public onSubmit(): void {
    // renew the status of this process
    this.submitted = 'processing';

    // prepare the request body for posting this recognition
    const sentToId = this.recognitionForm.controls.name.value;
    const target = this.appCache.employees.find(e => e.Id === sentToId);
    const result = {
      id: uuid.v4(),
      sentFrom: this.appCache.currentUser.id,
      sentFromName: this.appCache.currentUser.name,
      sentTo: sentToId,
      sentToName: target?.Name,
      notifyTo: target?.ReportingTo, // the person's manager will be notified
      category: this.recognitionForm.controls.category.value,
      message: this.recognitionForm.controls.message.value
    };
    console.log(result);
    const param = JSON.stringify(result);

    // send a post request
    this.portalService.postRecognition(param).subscribe(ret => {
      // "POST" request is sent to the back-end. Create a message to the user.
      this.submitted = 'submitted';
      if (ret.statusCode === 200) {
        this.systemMessage = 'Thank you! Your recognition has been sent to the system. Recognition Id: '
          + ret.body
          + '. Click the back button to go back to the landing page.'
      } else {
        this.systemMessage = 'Something went wrong. Please try again or contact the administrator.'
      }
      // disable the "submit" button
      this.recognitionForm.reset();
    })
  }
}
