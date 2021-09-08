import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {UserModel} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'phoneNumber'];
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource([] as UserModel[]);

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.getAllUsers()
            .pipe(catchError(() => observableOf(null)));
        }),
        map(users => {
          this.isLoadingResults = false;

          if (users === null) {
            return [];
          }

          this.resultsLength = users.length;
          return users;
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}