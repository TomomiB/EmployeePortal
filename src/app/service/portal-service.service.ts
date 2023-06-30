import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  public headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  public requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }

  constructor(
    private http: HttpClient
  ) { }

  public getTestString(): Observable<any> {
    return this.http.get<string>('https://ortfqjhz6g.execute-api.us-east-1.amazonaws.com/dev');
  }

  public getEmployees(): Observable<any> {
    return this.http.get<string>('https://gwbsxx3dl9.execute-api.us-east-1.amazonaws.com/dev');
  }

  public postRecognition(recognition: any): Observable<any> {
    return this.http.post<any>('https://5ryqavj4nj.execute-api.us-east-1.amazonaws.com/dev', recognition);
  }

  // Future work: Rewrite following POST requests with GET and query param
  public getMyRecognition(userId: string): Observable<any> {
    const request = {
      sentToId: userId
    }
    return this.http.post<any>('https://wgk8b8go9k.execute-api.us-east-1.amazonaws.com/dev', JSON.stringify(request));
  }

  public getMyTeamNotification(userId: string): Observable<any> {
    const request = {
      notifyToId: userId
    }
    return this.http.post<any>('https://ka7rtv22rl.execute-api.us-east-1.amazonaws.com/dev', JSON.stringify(request));
  }

  public getCurrentUserRecognition(userId: string): Observable<any> {
    const request = {
      sentFromId: userId
    }
    return this.http.post<any>('https://04uijbiif7.execute-api.us-east-1.amazonaws.com/dev', JSON.stringify(request));
  }
}
