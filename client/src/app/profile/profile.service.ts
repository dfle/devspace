import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProfileService {

  constructor(private _http: Http) {  }

    public userData: {};
    public githubData: {};
    public bytesStat: 0;
    public languages: {};

    fetchBytes(username): Observable<any> {
      let headers = new Headers({ 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/profile/code', options)
        .map((data:Response) => data.json())
    }

    fetchUserInfo(username): Observable<any> {
      let headers = new Headers({ 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/userProfile', options)
        .map((data:Response) => data.json())
        .catch(err => {
          throw Observable.throw(err.json())
        })
    }

    fetchGithubUserInfo(username, currentUser): Observable<any> {
      let headers = new Headers({ 'username': username, 'currentUser': currentUser })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/userProfileGithub', options)
        .map((data:Response) => data.json())
        .catch(err => {
          throw Observable.throw(err.json())
        })
    }

  follow(followedUsername, userid):Observable<any> {
      let headers = new Headers({'userid': userid});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/follows/' + userid + '/following', {'followedUsername': followedUsername}, {
        headers: headers
      })
  }

}