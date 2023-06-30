import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AppCacheService } from 'src/app/service/app-cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private _currentUser: User = {
    name: '',
    email: '',
    id: ''
  };

  @Input()
  public set currentUser(user: User) {
    this._currentUser = user;
  }
  public get currentUser() {
    return this._currentUser;
  }

  constructor(
    public appCache: AppCacheService,
    private router: Router
  ) {
    // set the main page after the login
    this.router.navigate(['/main']);
  }
  ngOnInit(): void {
    this.appCache.currentUser = this._currentUser;
    console.log(this.appCache.currentUser);
  }

  ngOnDestroy(): void {
    this.appCache.currentUser = {
      name: '',
      email: '',
      id: ''
    };
  }

}
