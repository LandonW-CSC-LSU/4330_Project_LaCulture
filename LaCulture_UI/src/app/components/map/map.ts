import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  standalone: true
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any;
  private L: any;
  private view: any;

  async ngAfterViewInit(): Promise<void> {
    const L = await import('leaflet');
    this.L = L;

    this.map = L.map('map', {
      center: [29.9511, -90.0715],
      zoom: 13,
      maxBoundsViscosity: 1.0
    });

    const markerIcon = L.icon({
      iconUrl: 'assets/images/marker.png',
      iconAnchor: [37, 47]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      detectRetina: true
    }).addTo(this.map);

    const markerOne = L.marker([29.9511, -90.0715], { icon: markerIcon })
      .addTo(this.map)
      .bindTooltip('Google');

    const markerTwo = L.marker([29.9611, -90.0715], { icon: markerIcon })
      .addTo(this.map)
      .bindTooltip('Bing');

    markerOne.on('click', () => window.location.href = 'https://www.google.com');
    markerTwo.on('click', () => window.location.href = 'https://www.bing.com');
    const viewControl = (L as any).control({ position: 'topright' });

    viewControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      div.style.background = 'white';
      div.style.padding = '10px';
      div.style.borderRadius = '8px';
      div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      div.style.fontSize = '16px';
      div.style.fontWeight = '500';
      div.style.zIndex = '1000';

      const select = L.DomUtil.create('select', '', div);
      select.innerHTML = `
        <option value="neworleans">New Orleans</option>
        <option value="batonrouge">Baton Rouge</option>
        <option value="louisiana">Louisiana (Full)</option>
      `;

      // prevent map drag when clicking on the select box
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.on(select, 'change', (e: Event) => this.changeView(e));
      const resetBtn = L.DomUtil.create('button', '', div);
      resetBtn.textContent = 'Reset View';
      L.DomEvent.disableClickPropagation(resetBtn);
      L.DomEvent.on(resetBtn, 'click', () => {
        this.setView();
      });
      return div;
    };

  viewControl.addTo(this.map);
  this.changeView({ target: { value: 'neworleans' } } as any);
  }

  changeView(event: Event): void {
    const view = (event.target as HTMLSelectElement).value;

    const views = {
      neworleans: {
        center: [29.9511, -90.0715],
        zoom: 13,
        minZoom: 13,
        bounds: this.L.latLngBounds(
          [29.85, -90.15],
          [30.05, -89.85]
        )
      },
      batonrouge: {
        center: [30.4515, -91.1871],
        zoom: 13,
        minZoom: 13,
        bounds: this.L.latLngBounds(
          [30.35, -91.25],
          [30.55, -91.05]
        )
      },
      louisiana: {
        center: [30.9843, -91.9623],
        zoom: 7,
        minZoom: 0,
        bounds: null
      }
      
    };

    this.view = (views as any)[view];
    this.setView();
  }
  setView(): void {
    this.map.options.minZoom = this.view.minZoom;
    this.map.setView(this.view.center, this.view.zoom);
    this.map.setZoom(Math.max(this.map.getZoom(), this.view.minZoom));
    if (this.view.bounds) {
      this.map.setMaxBounds(this.view.bounds);
    } else {
      this.map.setMaxBounds(null);
    }
    this.map.panTo(this.view.center, { animate: false });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
