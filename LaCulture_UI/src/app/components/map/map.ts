import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
  standalone: true
})

export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any;

  async ngAfterViewInit(): Promise<void> {
    const L = await import('leaflet');

    this.map = L.map('map', {
      center: [29.9511, -90.0715],
      zoom: 13
    });

    const markerIcon = L.icon({
      iconUrl: 'assets/images/marker.png',
      iconAnchor: [37,47]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const markerOne = L.marker([29.9511, -90.0715], { icon: markerIcon })
      .addTo(this.map)
      .bindTooltip('Google');

    const markerTwo = L.marker([29.9611, -90.0715], { icon: markerIcon })
      .addTo(this.map)
      .bindTooltip('Bing');

    markerOne.on('click', () => window.location.href = 'https://www.google.com');
    markerTwo.on('click', () => window.location.href = 'https://www.bing.com');
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
