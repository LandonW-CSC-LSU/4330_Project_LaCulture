import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getHomeMessage().subscribe(
      res => this.message = res.message,
      err => this.message = 'Error connecting to API'
    );
  }
}