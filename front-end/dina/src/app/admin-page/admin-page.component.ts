import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel} from '../_models/user';
import { UserService} from '../_services/user.service';
import { AlertService} from '../_services/alert.service';
import { MatListOption } from '@angular/material/list';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  totalUsers: UserModel[];
  selectedUsers: number[];

  constructor(private http: HttpClient, private userService: UserService, private alertService: AlertService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(
        users => this.totalUsers = users,
        error => this.alertService.errorResponse(error)
      );
  }

  onExportData(usersSelected: MatListOption[], method: string) {
    this.selectedUsers = usersSelected.map(obj => obj.value.userId);
    this.adminService.exportUserData(this.selectedUsers, method)
      .subscribe(
        data => console.log(data),
        error => this.alertService.errorResponse(error),
      );
  }
}