import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any;
  private L: any;
  private view: any;
  private markers: Map<number, any> = new Map();
  private highlightedEventId: number | null = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const L = await import('leaflet');
    this.L = L;

    this.map = L.map('map', {
      center: [29.9511, -90.0715],
      zoom: 13,
      maxBoundsViscosity: 1.0
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      detectRetina: true
    }).addTo(this.map);

    // Load events from API and add markers
    this.loadEventsAndAddMarkers();

    const viewControl = (L as any).control({ position: 'topright' });

    viewControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control custom-map-control');

      const select = L.DomUtil.create('select', 'map-select', div);
      select.innerHTML = `
        <option value="neworleans">New Orleans</option>
        <option value="batonrouge">Baton Rouge</option>
        <option value="louisiana">Louisiana (Full)</option>
      `;

      // prevent map drag when clicking on the select box
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.on(select, 'change', (e: any) => this.changeView(e));
      const resetBtn = L.DomUtil.create('button', 'map-reset', div);
      resetBtn.textContent = 'Reset View';
      L.DomEvent.disableClickPropagation(resetBtn);
      L.DomEvent.on(resetBtn, 'click', () => {
        this.setView();
      });
      return div;
    };

  viewControl.addTo(this.map);
  this.changeView({ target: { value: 'neworleans' } } as any);

  // Check for eventId query parameter
  this.route.queryParams.subscribe(params => {
    const eventId = params['eventId'];
    if (eventId) {
      this.highlightedEventId = +eventId;
      this.highlightEvent(+eventId);
    }
  });
  }

  changeView(event: any): void {
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

  private loadEventsAndAddMarkers(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.addMapPoints(events);
      },
      error: (err) => {
        console.error('Error loading events for map:', err);
        // Optionally show error message to user
      }
    });
  }

  private addMapPoints(events: Event[]): void {
    const markerIcon = this.L.icon({
      iconUrl: 'assets/images/betterstar.png',
      iconSize: [40,40],
      iconAnchor: [22, 21]
    });

    const highlightedIcon = this.L.icon({
      iconUrl: 'assets/images/betterstar.png',
      iconSize: [60,60],
      iconAnchor: [30, 30]
    });

    for (const event of events) {
      const coords: [number, number] = [event.latitude, event.longitude];
      const isHighlighted = event.id === this.highlightedEventId;
      
      const marker = this.L.marker(coords, { 
        icon: isHighlighted ? highlightedIcon : markerIcon 
      })
      .addTo(this.map)
      .bindTooltip(`${event.title} — ${event.date}`)
      .on('click', () => {
        if (event.website) {
          window.open(event.website, '_blank');
        }
      });

      this.markers.set(event.id, marker);

      // If this is the highlighted event, open its popup and pan to it
      if (isHighlighted) {
        marker.openTooltip();
        this.map.setView(coords, 15, { animate: true });
      }
    }
  }

  private highlightEvent(eventId: number): void {
    const marker = this.markers.get(eventId);
    if (marker) {
      const coords = marker.getLatLng();
      this.map.setView([coords.lat, coords.lng], 15, { animate: true });
      marker.openTooltip();
    }
  }
}