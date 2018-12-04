import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  user_career: string;
  status: boolean;

  userObject: object;

  addingErrorMsg: object;
  alertStatus: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.alertStatus = true;

    this.userObject = {};
    this.first_name = '';
    this.last_name = '';
    this.email_address = '';
    this.user_career = '';
    this.status = true;

  }

  onSelectCreateUser() {
    this.userObject['first_name'] = this.first_name;
    this.userObject['last_name'] = this.last_name;
    this.userObject['email_address'] = this.email_address;
    this.userObject['career'] = this.user_career;
    this.userObject['status'] = this.status;

    this.userService.createUser(this.userObject).subscribe(
      res => {
        this.router.navigate(['/userAccount']);
      }, err => {
        this.addingErrorMsg = JSON.parse(err._body).data;
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

  ngOnInit() {
  }

}





