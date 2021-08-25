import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs = [
    {
      title: 'Network',
      link: 'network',
    },
    {
      title: 'Jobs',
      link: 'jobs',
    },
    {
      title: 'Chat',
      link: 'chat',
    },
    {
      title: 'Notifications',
      link: 'notifications',
    },
    {
      title: 'Personal Info',
      link: 'personalInfo',
    },
    {
      title: 'Home',
      link: 'home',
    },
    {
      title: 'Settings',
      link: 'settings',
    },
  ]

  activeLink = this.tabs[0].title;
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
