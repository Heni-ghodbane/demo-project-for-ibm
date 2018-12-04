import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router) {

    if (localStorage.getItem('loggedin') === '' || localStorage.getItem('loggedin') === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }

  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        localStorage.setItem('loggedin', '');
        this.router.navigate(['/login']);
        this.loggedIn = false;
      },
      err => console.log(err)
    );
  }

  getDisplay() {
    if (this.loggedIn) {
      return false;
    } else {
      return true;
    }
  }

  updateMenu() {
    const loggedParam = localStorage.getItem('loggedin');
    this.loggedIn = loggedParam === 'true' ? true : false;

    console.log(JSON.stringify(this.loggedIn));
  }
  ngOnInit() {

  }

}
