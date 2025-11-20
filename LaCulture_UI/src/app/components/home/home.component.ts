import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import {
  CarouselComponent,
  CarouselConfig,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselIndicatorsComponent
} from '@coreui/angular';
import { Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Injectable()
export class CarouselCustomConfig {
  activeIndex = 0;
  animate = true;
  direction: 'next' | 'prev' = 'next';
  interval? = 7000;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbCarouselModule,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselIndicatorsComponent,
    MatButtonModule,
    MatCardModule
  ],
  providers: [{ provide: CarouselConfig, useClass: CarouselCustomConfig }]
})
export class HomeComponent {

  images = [
    'assets/images/mardiGras.png',
    'assets/images/swamp.jpg',
    'assets/images/oaks.jpg',
    'assets/images/crawfish.jpg',
    'assets/images/mardiGrasFloat.jpg',
    'assets/images/stJosephAltar2025.png'
  ];
  
  slides = [
    { src: 'assets/images/mardiGras.png', title: 'Mardi Gras', subtitle: 'A Louisiana Tradition', buttonText: 'Experience Events', route: '/events' },
    { src: 'assets/images/swamp.jpg', title: 'Swamp', subtitle: 'Bayou Life', buttonText: 'Explore Map', route: '/map' },
    { src: 'assets/images/oaks.jpg', title: 'Oaks', subtitle: 'Historic Trees', buttonText: 'Discover Tours', route: '/tours' },
    { src: 'assets/images/crawfish.jpg', title: 'Crawfish', subtitle: 'Cajun Cuisine', buttonText: 'View Recipes', route: '/recipes' },
    { src: 'assets/images/mardiGrasFloat.jpg', title: 'Float', subtitle: 'Parade Magic', buttonText: 'Calendar', route: '/calendar' },
    { src: 'assets/images/stJosephAltar2025.png', title: 'St Joseph Altar', subtitle: 'Cultural Heritage', buttonText: 'About LaCulture', route: '/about' }
  ];


  constructor() {}

  navigateToAudubonZoo(){
    window.location.href = 'https://audubonnatureinstitute.org/zoo';
  }

  navigateToSuperdome(){
    window.location.href = 'https://www.caesarssuperdome.com';
  }

  navigateToMarieLaveau(){
    window.location.href = 'https://neworleanshistorical.org/items/show/1612';
  }

  navigateToWW2(){
    window.location.href = 'https://www.nationalww2museum.org';
  }

  navigateToFrenchQuarter(){
    window.location.href = 'https://www.frenchquarter.com/first-timers-guide-french-quarter/';
  }

  navigateToCafeDuMonde(){
    window.location.href = 'https://shop.cafedumonde.com';
  }

  navigateToTigerStadium(){
    window.location.href = 'https://lsusports.net/facilities/tiger-stadium';
  }

  navigateToStateCapitol(){
    window.location.href = 'https://house.louisiana.gov/pubinfo/VirtualTour/Default.htm';
  }

  navigateToBourbon(){
    window.location.href = 'https://www.frenchquarter.com/bourbon-street';
  }

  navigateToBrennans(){
     window.location.href = 'https://www.brennansneworleans.com';
  }

}
