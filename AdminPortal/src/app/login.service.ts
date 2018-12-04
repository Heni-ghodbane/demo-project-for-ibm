import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

    /*
    import { environment } from '../environments/environment';

     if (environment.production) {
      this.domain = 'http://localhost:8090';
     }*/

  }

  sendCredential(username: string, password: string) {
    const params = '?username=' + username + '&password=' + password;
    const url = 'http://localhost:8081/api/login' + params;

    return this.http.get(url, { withCredentials: true });
  }

  logout() {
    const url = 'http://localhost:8081/api/logout';
    return this.http.get(url, { withCredentials: true });
  }

}
