import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';

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

  async ngAfterViewInit(): Promise<void> {
    const L = await import('leaflet');
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

    const events = this.getMapEvents();

    this.addMapPoints(events);
    this.addHeatmap(events);
    

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
      L.DomEvent.on(select, 'change', (e: Event) => this.changeView(e));
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


  //Functionality is placeholder to the actual function which will load from events API (being worked on now)
  getMapEvents(): MapEvent[] {
    return [
      { id: 1,  title: 'LSU vs Texas A&M',
        popularity: 1.00,  // Tiger Stadium game = 102k people
        date: '10/25/2025', location: 'Baton Rouge',
        website: 'https://lsusports.evenue.net/list/FB',
        coords: [30.4120, -91.1830]
      },

      { id: 2,  title: 'Saints vs Buccaneers',
        popularity: 0.95,  // Superdome NFL game ≈ 70k people
        date: '10/26/2025', location: 'New Orleans',
        website: 'https://www.neworleanssaints.com/tickets/',
        coords: [29.9511, -90.0812]
      },

      { id: 3,  title: 'National Fried Chicken Festival',
        popularity: 0.80,  // absolutely packed every year
        date: '10/4-5/2025', location: 'New Orleans',
        website: 'https://www.friedchickenfestival.com/',
        coords: [29.9935, -90.0640]
      },

      { id: 4,  title: 'Oktoberfest',
        popularity: 0.65,  // medium-large, strong turnout
        date: '10/10-25/2025', location: 'New Orleans',
        website: 'https://deutscheshaus.org/oktoberfest/',
        coords: [29.9903, -90.0930]
      },

      { id: 5,  title: 'Nola Funk Fest 2025',
        popularity: 0.55,
        date: '10/17-19/2025', location: 'New Orleans',
        website: 'https://www.nolafunkfest.com/',
        coords: [29.9412, -90.0672]
      },

      { id: 6,  title: 'Praise Fest',
        popularity: 0.45,  // niche but decently attended
        date: '10/17-19/2025', location: 'New Orleans',
        website: 'https://www.praisefestnola.com/',
        coords: [29.9538, -90.0638]
      },

      { id: 7,  title: 'New Orleans Film Festival',
        popularity: 0.60,  // big arts event
        date: '10/23/2025–11/2/2025', location: 'New Orleans',
        website: 'https://neworleansfilmsociety.org/attend/',
        coords: [29.9520, -90.0700]
      },

      { id: 8,  title: 'HNO Halloween New Orleans',
        popularity: 0.75,  // very popular LGBTQ Halloween event
        date: '10/24-26/2025', location: 'New Orleans',
        website: 'https://www.halloweenneworleans.com/',
        coords: [29.9570, -90.0620]
      },

      { id: 9,  title: 'NOLA Reggae Fest',
        popularity: 0.40,  // medium turnout, niche genre
        date: '10/24-26/2025', location: 'New Orleans',
        website: 'https://www.eventbrite.com/e/2025-nola-reggae-fest-tickets-1369000991819',
        coords: [29.9880, -90.0930]
      },

      { id: 10, title: 'Krewe of BOO!',
        popularity: 0.85,  // huge Halloween parade, packed streets
        date: '10/25/2025', location: 'New Orleans',
        website: 'https://www.kreweofboo.com/',
        coords: [29.9510, -90.0720]
      },

      { id: 11, title: 'Treme Fall Fest',
        popularity: 0.55,  // strong neighborhood turnout
        date: '10/25/2025', location: 'New Orleans',
        website: 'https://www.tremefest.org/',
        coords: [29.9713, -90.0707]
      },

      { id: 12, title: 'NOLA MusiCon',
        popularity: 0.35,  // small-to-moderate professional event
        date: '10/28-30/2025', location: 'New Orleans',
        website: 'https://www.nolamusicon.com/',
        coords: [29.9412, -90.0672]
      },

      { id: 13, title: 'Bayou Bacchanal',
        popularity: 0.50,  // Caribbean culture fest, medium crowd
        date: '10/31–11/1/2025', location: 'New Orleans',
        website: 'https://www.friendsofculture.org/',
        coords: [29.9688, -90.0715]
      },

      { id: 14, title: 'Freret Street Fall Festival',
        popularity: 0.70,  // Freret always draws a LARGE crowd
        date: '11/1/2025', location: 'New Orleans',
        website: 'https://freretstreetfestival.org/',
        coords: [29.9386, -90.1030]
      },

      { id: 15, title: 'Tremé Creole Gumbo Festival',
        popularity: 0.65,  // heavily attended food/music fest
        date: '11/8-9/2025', location: 'New Orleans',
        website: 'https://www.jazzandheritage.org/events/2025-treme-creole-gumbo-festival/',
        coords: [29.9670, -90.0708]
      },

      { id: 16, title: 'Beignet Fest',
        popularity: 0.75,  // big crowd, family-friendly
        date: '11/15/2025', location: 'New Orleans',
        website: 'https://beignetfest.com/',
        coords: [29.9895, -90.0945]
      }
    ];
  }



  addMapPoints(events: MapEvent[]): void {

    const markerIcon = this.L.icon({
      iconUrl: 'assets/images/betterstar.png',
      iconSize: [40,40],
      iconAnchor: [22, 21]
    });

    for (const event of events) {
      this.L.marker(event.coords, { icon: markerIcon })
      .addTo(this.map)
      .bindTooltip(`${event.title} — ${event.date}`)
      .on('click', () => window.open(event.website, '_blank'));

    }
    
  }

  addHeatmap(events: MapEvent[]): void {
    const heatPoints=events.map(e => [
      e.coords[0],
      e.coords[1],
      e.popularity*2
    ])

    this.heatmapLayer=this.L.heatLayer(heatPoints, {
      radius: 60,
      blur: 50,
      maxZoom:14,
      max: 1.0
    });
    this.map.addLayer(this.heatmapLayer)
  }
  
}


interface MapEvent {
  id: number;
  title: string;
  popularity: number;
  date: string;
  location: string;
  website: string;
  coords: [number, number];
}