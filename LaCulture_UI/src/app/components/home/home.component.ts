import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, NgbCarouselModule]
})
export class HomeComponent {
  menuOptions = ['Home', 'Recipes', 'Events', 'Map', 'About'];
  selectedOption = this.menuOptions[0];
  images = [
    'assets/images/mardiGras.png',
    'assets/images/swamp.png',
    'assets/images/oaks.jpg',
  ];

  constructor() {}

  selectOption(option: string) {
    this.selectedOption = option;
  }
}