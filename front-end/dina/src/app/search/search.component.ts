import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dina-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(['/searchList', {term: this.searchTerm}]);
  }

}
