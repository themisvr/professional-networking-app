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
  private saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    return function (data: any, fileName: any) {
        var blob = new Blob([data], {type: "octet/stream"});
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
  }());

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
        data => {
          const filename = `dina_user_data_${new Date().toJSON().slice(0, 10)}.${method}`;
          this.saveData(data, filename);
        },
        error => this.alertService.errorResponse(error),
      );
  }
}