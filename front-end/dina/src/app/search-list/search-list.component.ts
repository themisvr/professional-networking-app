import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { SearchServiceService } from '../_services/search-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  searchUser: string;
  foundUsers: User[] = [];

  constructor(private searchService: SearchServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchUser = params.get("user") || "";
      this.searchService.search(this.searchUser).subscribe(users => this.foundUsers = users);
    })
  }

}
