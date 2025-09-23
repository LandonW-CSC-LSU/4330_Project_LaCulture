import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from '../map/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, NgbCarouselModule, MapComponent]
})
export class HomeComponent {
  private map: any;
  menuHeaderClass = '';
  @HostListener('window:scroll', []) onScroll(){
    if (window.scrollY > 0) {
      this.menuHeaderClass = 'scrolled';
    } else {
      this.menuHeaderClass = '';
    }
  }
  menuOptions = ['Home', 'Recipes', 'Events', 'Map', 'About'];
  selectedOption = this.menuOptions[0];

  images = [
    'assets/images/mardiGras.png',
    'assets/images/swamp.jpg',
    'assets/images/oaks.jpg',
    'assets/images/crawfish.jpg',
    'assets/images/mardiGrasFloat.jpg',
    'assets/images/stJosephAltar2025.png'
  ];


  constructor() {}



  selectOption(option: string) {
    this.selectedOption = option;
  }

}