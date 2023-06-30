import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class AppCacheService {

  constructor() { }

  public currentUser: User = {
    name: '',
    email: '',
    id: ''
  };

  public employees: Employee[] = [];
}
