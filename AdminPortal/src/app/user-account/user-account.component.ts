import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap,  } from '@angular/router';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userList: Object[];

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.userList = [];
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        // console.log(JSON.parse(JSON.parse(JSON.stringify(res))._body).data);
        this.userList = JSON.parse(JSON.parse(JSON.stringify(res))._body).data;
      },
      error => console.log(error)
    );
  }

  onSelectEditUser(id: string) {
    this.router.navigate(['/userEdit', id]);
  }

  onSelectDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => {
      this.getUsers();
    });
  }

  ngOnInit() {
  }
}
