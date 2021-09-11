import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel} from '../_models/user';
import { UserService} from '../_services/user.service';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  totalUsers: UserModel[];
  selectedUsers: number[];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => this.totalUsers = users);
  }

  onExportData(usersSelected: MatListOption[]) {
    this.selectedUsers = usersSelected.map(obj => obj.value.userId);
  }
}