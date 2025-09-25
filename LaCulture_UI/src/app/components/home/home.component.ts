import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    { src: 'assets/images/mardiGras.png', title: 'Mardi Gras', subtitle: 'A Louisiana Tradition' },
    { src: 'assets/images/swamp.jpg', title: 'Swamp', subtitle: 'Bayou Life' },
    { src: 'assets/images/oaks.jpg', title: 'Oaks', subtitle: 'Historic Trees' },
    { src: 'assets/images/crawfish.jpg', title: 'Crawfish', subtitle: 'Cajun Cuisine' },
    { src: 'assets/images/mardiGrasFloat.jpg', title: 'Float', subtitle: 'Parade Magic' },
    { src: 'assets/images/stJosephAltar2025.png', title: 'St Joseph Altar', subtitle: 'Cultural Heritage' }
  ];


  constructor() {}

}