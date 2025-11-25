import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CalendarService } from '../../services/calendar.service';
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
  private heatmapLayer: any;
  private markers: Map<number, any> = new Map();
  private highlightedEventId: number | null = null;

  constructor(
    private eventService: EventService,
    private calendarService: CalendarService,
    private route: ActivatedRoute
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const L = await import('leaflet');
    // @ts-ignore - leaflet.heat module exists at runtime
    await import('leaflet.heat');
    this.L = (window as any).L;
    console.log("HeatLayer exists now?", this.L.heatLayer);


    this.map = L.map('map', {
      center: [29.9511, -90.0715],
      zoom: 13,
      maxBoundsViscosity: 1.0
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      detectRetina: true
    }).addTo(this.map);

    
    // Check for eventId query parameter before loading events
    this.route.queryParams.subscribe(params => {
      const eventId = params['eventId'];
      if (eventId) {
        this.highlightedEventId = +eventId;
      }
    });

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
      const heatContainer=L.DomUtil.create('div', 'heat-container', div);
      const heatLabel=L.DomUtil.create('label', 'heat-toggle-label', heatContainer);
      const heatmapToggle=L.DomUtil.create('input', 'heat-toggle', heatContainer);
      heatmapToggle.type = 'checkbox';
      heatmapToggle.checked = true;
      heatmapToggle.id = 'heatmap-toggle';
      heatLabel.htmlFor = 'heatmap-toggle';
      heatLabel.textContent = 'Show Heatmap'
      L.DomEvent.disableClickPropagation(heatmapToggle);
      L.DomEvent.disableClickPropagation(heatLabel);
      L.DomEvent.on(heatmapToggle, 'change', () => {
        if (heatmapToggle.checked) {
          this.map.addLayer(this.heatmapLayer);
        } else {
          this.map.removeLayer(this.heatmapLayer);
        }
        });

      return div;
    };

  viewControl.addTo(this.map);
  // Don't set default view yet - wait for events to load
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
        this.addDatabaseMapPoints(events);
        this.addHeatmap(events);
        this.setupCalendarIntegration(events);
        
        // After markers are loaded, check if we need to highlight an event
        if (this.highlightedEventId) {
          this.highlightEvent(this.highlightedEventId);
        } else {
          // Set default view to New Orleans if no event is highlighted
          this.changeView({ target: { value: 'neworleans' } } as any);
        }
      },
      error: (err) => {
        console.error('Error loading events for map:', err);
        // Set default view even on error
        this.changeView({ target: { value: 'neworleans' } } as any);
      }
    });
  }

  private addDatabaseMapPoints(events: Event[]): void {
    // Create custom div icon with fleur-de-lis emoji
    const markerIcon = this.L.divIcon({
      html: '<div style="font-size: 36px; filter: drop-shadow(0 0 2px rgba(0,0,0,1)) drop-shadow(0 0 4px rgba(0,0,0,0.8));">⚜️</div>',
      className: 'custom-marker-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const highlightedIcon = this.L.divIcon({
      html: '<div style="font-size: 54px; filter: drop-shadow(0 0 3px rgba(0,0,0,1)) drop-shadow(0 0 6px rgba(0,0,0,0.8));">⚜️</div>',
      className: 'custom-marker-icon-highlighted',
      iconSize: [60, 60],
      iconAnchor: [30, 30]
    });

    for (const event of events) {
      const coords: [number, number] = [event.latitude, event.longitude];
      const isHighlighted = event.id === this.highlightedEventId;
      
      // Create popup content with calendar button
      const popupContent = this.createPopupContent(event);
      
      const marker = this.L.marker(coords, { 
        icon: isHighlighted ? highlightedIcon : markerIcon 
      })
      .addTo(this.map)
      .bindPopup(popupContent, { 
        maxWidth: 300,
        className: 'event-popup'
      })
      .on('click', () => {
        marker.openPopup();
      });

      this.markers.set(event.id, marker);

      // If this is the highlighted event, open its popup and pan to it
      if (isHighlighted) {
        marker.openPopup();
        this.map.setView(coords, 15, { animate: true });
      }
    }
  }

  private createPopupContent(event: Event): string {
    return `
      <div class="map-event-popup">
        <h3>${event.title}</h3>
        <p class="event-date"><strong>📅 ${event.date}</strong></p>
        <p class="event-location">📍 ${event.location}</p>
        ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
        ${event.popularity ? `<p class="event-popularity">Popularity: ${Math.round(event.popularity * 10)}/10</p>` : ''}
        <div class="popup-actions">
          ${event.website ? `<a href="${event.website}" target="_blank" class="popup-btn website-btn">
            <span>🌐</span> Visit Website
          </a>` : ''}
          <button class="popup-btn calendar-btn" onclick="window.addEventToCalendar(${event.id})">
            <span>📅</span> Add to Calendar
          </button>
        </div>
      </div>
    `;
  }

  private setupCalendarIntegration(events: Event[]): void {
    // Expose calendar function to window for popup buttons
    (window as any).addEventToCalendar = (eventId: number) => {
      const event = events.find(e => e.id === eventId);
      if (event) {
        this.showCalendarOptions(event);
      }
    };
  }

  private showCalendarOptions(event: Event): void {
    this.showCalendarDialog(event);
  }

  private showCalendarDialog(event: Event): void {
    const dialog = document.createElement('div');
    dialog.className = 'calendar-dialog-overlay';
    dialog.innerHTML = `
      <div class="calendar-dialog">
        <h3>Add to Calendar</h3>
        <p>Select your calendar service:</p>
        <div class="calendar-options">
          <button class="calendar-option-btn google" data-type="google">
            <span>📅</span> Google Calendar
          </button>
          <button class="calendar-option-btn outlook" data-type="outlook">
            <span>📧</span> Outlook
          </button>
          <button class="calendar-option-btn yahoo" data-type="yahoo">
            <span>📮</span> Yahoo Calendar
          </button>
          <button class="calendar-option-btn ics" data-type="ics">
            <span>💾</span> Download ICS
          </button>
        </div>
        <button class="calendar-close-btn">Cancel</button>
      </div>
    `;

    document.body.appendChild(dialog);

    // Add event listeners
    dialog.querySelector('.google')?.addEventListener('click', () => {
      this.addToGoogleCalendar(event);
      document.body.removeChild(dialog);
    });

    dialog.querySelector('.outlook')?.addEventListener('click', () => {
      this.addToOutlook(event);
      document.body.removeChild(dialog);
    });

    dialog.querySelector('.yahoo')?.addEventListener('click', () => {
      this.addToYahooCalendar(event);
      document.body.removeChild(dialog);
    });

    dialog.querySelector('.ics')?.addEventListener('click', () => {
      this.downloadICS(event);
      document.body.removeChild(dialog);
    });

    dialog.querySelector('.calendar-close-btn')?.addEventListener('click', () => {
      document.body.removeChild(dialog);
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        document.body.removeChild(dialog);
      }
    });
  }

  private addToGoogleCalendar(event: Event): void {
    const url = this.calendarService.getGoogleCalendarUrl(event);
    this.calendarService.openCalendarLink(url);
  }

  private addToOutlook(event: Event): void {
    const url = this.calendarService.getOutlookUrl(event);
    this.calendarService.openCalendarLink(url);
  }

  private addToYahooCalendar(event: Event): void {
    const url = this.calendarService.getYahooCalendarUrl(event);
    this.calendarService.openCalendarLink(url);
  }

  private downloadICS(event: Event): void {
    this.calendarService.downloadICS(event);
  }

  addHeatmap(events: Event[]): void {
    const heatPoints = events.map(e => [
      e.latitude,
      e.longitude,
      (e.popularity ?? 0.5)
    ]);
    const maxPopularity = Math.max(...events.map(e => (e.popularity ?? 0.5)));
    this.heatmapLayer = this.L.heatLayer(heatPoints, {
      radius: 60,
      blur: 50,
      maxZoom: 14,
      max: maxPopularity
    });
    this.map.addLayer(this.heatmapLayer);
  }

  private highlightEvent(eventId: number): void {
    const marker = this.markers.get(eventId);
    if (marker) {
      const coords = marker.getLatLng();
      // Clear map bounds to allow navigation to any location
      this.map.setMaxBounds(null);
      this.map.options.minZoom = 0;
      this.map.setView([coords.lat, coords.lng], 15, { animate: true });
      marker.openPopup();
    }
  }
}

