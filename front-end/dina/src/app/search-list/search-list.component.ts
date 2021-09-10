import { UserModel } from './../_models/user';
import { Component, Input, OnInit } from '@angular/core';
import { SearchServiceService } from '../_services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dina-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input() foundUsers: UserModel[] = [];

  constructor(private searchService: SearchServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const searchTerm = params.get("term") || "";
      if (searchTerm !== "") {
        this.searchService.search(searchTerm).subscribe(users => this.foundUsers = users);
      }
    })
  }

  onView(email: string) {
    this.router.navigate(['/personalInfo', { email: email }]);
  }
}
