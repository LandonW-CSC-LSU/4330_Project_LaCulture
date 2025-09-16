import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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

  ngAfterViewInit() {
    if (this.selectedOption === 'Map') {
      this.initMap();
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
    if (option === 'Map') {
      setTimeout(() => this.initMap(), 0);
    }
  }

  private async initMap(): Promise<void> {
  if (this.map) {
    this.map.remove();
  }

  const L = await import('leaflet');

  this.map = L.map('map', {
    center: [29.9511, -90.0715],
    zoom: 13
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  L.marker([29.9511, -90.0715]).addTo(this.map)
    .bindPopup('NOLA')
    .openPopup();
  
  }
}