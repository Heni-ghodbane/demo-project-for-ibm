import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';


@Injectable()
export class UserService {
  token: string;
  constructor(private http: Http) {
    sessionStorage.getItem('Authorization');

  }

  getUsers() {
    const url = 'http://localhost:8081/api/users';
    return this.http.get(url, { withCredentials: true });
  }

  createUser(user: object) {
    const first_name = user['first_name'];
    const last_name = user['last_name'];
    const email_address = user['email_address'];
    const career = user['career'];
    const status = user['status'];

    /*const params = 'first_name=' + first_name +
                 'last_name=' + last_name +
                 'email_address=' + email_address +
                 'career=' + career +
                 'status=' + status;
    const url = 'http://localhost:8081/api/user + params';
    return this.http.post(url, body, { withCredentials: true }); */

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('first_name', first_name);
    urlSearchParams.append('last_name', last_name);
    urlSearchParams.append('email_address', email_address);
    urlSearchParams.append('career', career);
    urlSearchParams.append('status', status);

    const body = urlSearchParams.toString();
    const url = 'http://localhost:8081/api/user';
    return this.http.post(url, body, { headers: headers, withCredentials: true });
  }

  deleteUser(id: string) {
    const url = 'http://localhost:8081/api/user/' + id;
    return this.http.delete(url, { withCredentials: false });
  }

  getUser(id: string) {
    const url = 'http://localhost:8081/api/user/' + id;
    return this.http.get(url, { withCredentials: false });
  }

  editUser(id: string, user: object) {
    const first_name = user['first_name'];
    const last_name = user['last_name'];
    const email_address = user['email_address'];
    const career = user['career'];
    const status = user['status'];

    const params = '?first_name=' + first_name +
                 '&last_name=' + last_name +
                 '&email_address=' + email_address +
                 '&career=' + career +
                 '&status=' + status;

    const url = 'http://localhost:8081/api/user/' + id + params;
    return this.http.put(url, null, { withCredentials: false });
  }

}
