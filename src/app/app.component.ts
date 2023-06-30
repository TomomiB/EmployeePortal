import { Component, OnInit, inject } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import awsExports from '../aws-exports'
import { AppCacheService } from './service/app-cache.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  public title = 'employee-portal';
  public currentRoute = '';

  constructor(
    public appCache: AppCacheService,
    public authenticator: AuthenticatorService,
    private router: Router
  ) {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    Auth.currentAuthenticatedUser().then(user => {
      this.appCache.currentUser = {
        name: user.attributes.name,
        email: user.attributes.email,
        id: user.attributes.sub
      };
    })
      .catch((err) => console.log(err));
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
