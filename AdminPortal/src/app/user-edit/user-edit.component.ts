import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  user_career: string;
  status: string;
  userObject: object;

  updateErrorMsg: object;
  alertStatus: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.alertStatus = true;

    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
    });
    this.getUserById(this.id);
  }

  getUserById(id) {
    this.userService.getUser(id).subscribe(
      res => {
        const user = JSON.parse(JSON.parse(JSON.stringify(res))._body).data;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email_address = user.email_address;
        this.user_career = user.career;
        this.status = user.status;
        this.userObject = user;
      },
      error => console.log(error)
    );
  }

  onSelectEditUser() {
    this.userObject['first_name'] = this.first_name;
    this.userObject['last_name'] = this.last_name;
    this.userObject['email_address'] = this.email_address;
    this.userObject['career'] = this.user_career;
    this.userObject['status'] = this.status;

    this.userService.editUser(this.id, this.userObject).subscribe(
      res => {
        this.router.navigate(['/userAccount']);
      }, err => {
        this.updateErrorMsg = JSON.parse(err._body).data.msg;
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
