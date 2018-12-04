import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;
  username: string;
  password: string;
  loginErrorMsg: string;
  alertStatus: boolean;

  constructor(private loginService: LoginService, private router: Router) {

    if (localStorage.getItem('loggedin') === '' || localStorage.getItem('loggedin') === null) {
      this.loggedIn = false;
      this.alertStatus = true;
    } else {
      this.loggedIn = true;
      this.router.navigate(['/userAccount']);
    }
  }


  onSubmit() {
    // testing offline
   // location.reload();

    // localStorage.setItem('loggedin', 'true');
    // sessionStorage.setItem('Authorization', JSON.parse(res['_body']).token);
   // this.router.navigate(['/userAccount']);

  this.loginService.sendCredential(this.username, this.password).subscribe(
      res => {
        location.reload();
        localStorage.setItem('loggedin', 'true');
        sessionStorage.setItem('Authorization', JSON.parse(res['_body']).token);
        this.router.navigate(['/userAccount']);
      },
      err => {
        this.loginErrorMsg = JSON.parse(err._body).data;
        this.alertStatus = false;
        this.hideErrorMsg();
        console.log(err._body);
      }
    );
  }

  hideErrorMsg() {
    const self = this;
    setTimeout(() => {
      this.alertStatus = true;
    }, 4000);

  }


  ngOnInit() { }

}
