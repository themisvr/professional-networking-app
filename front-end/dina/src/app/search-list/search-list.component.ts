import { User } from './../_models/user';
import { Component, Input, OnInit } from '@angular/core';
import { SearchServiceService } from '../_services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dina-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  searchUser: string;
  @Input() foundUsers: User[] = [];

  constructor(private searchService: SearchServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchUser = params.get("user") || "";
      if (this.searchUser !== "") {
        this.searchService.search(this.searchUser).subscribe(users => this.foundUsers = users);
      }
    })
  }

  onView(email: string) {
    this.router.navigate(['/personalInfo', { email: email }])
  }
}
