import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  website?: string;
  image?: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './events.html',
  styleUrls: ['./events.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  public items = signal<Event[]>([
    { id: 1, title: 'LSU vs Texas A&M', date: '10/25/2025', location: 'Baton Rouge', website: 'https://lsusports.evenue.net/list/FB', image: 'assets/images/tigerstadium.jpg'},
    { id: 2, title: 'Saints vs Buccaneers', date: '10/26/2025', location: 'New Orleans', website: 'https://www.neworleanssaints.com/tickets/', image: 'assets/images/superdome.jpg' },
    { id: 3, title: 'National Fried Chicken Festival', date: '10/4-5/2025', location: 'New Orleans', website: 'https://www.friedchickenfestival.com/', image: 'assets/images/crawfish.jpg' },
    { id: 4, title: 'Oktoberfest', date: '10/10-25/2025', location: 'New Orleans', website: 'https://deutscheshaus.org/oktoberfest/', image: 'assets/images/mardiGras.png' },
    { id: 5, title: 'Nola Funk Fest 2025', date: '10/17-19/2025', location: 'New Orleans', website: 'https://www.nolafunkfest.com/', image: 'assets/images/mardiGrasFloat.jpg' },
    { id: 6, title: 'Praise Fest', date: '10/17-19/2025', location: 'New Orleans', website: 'https://www.praisefestnola.com/' },
    { id: 7, title: 'New Orleans Film Festival ', date: '10/23/2025-11/2/2025', location: 'New Orleans', website: 'https://neworleansfilmsociety.org/attend/' },
    { id: 8, title: 'LGBT Halloween New Orleans (HNO)', date: '10/24-26/2025', location: 'New Orleans', website: 'https://www.halloweenneworleans.com/' },
    { id: 9, title: 'NOLA Reggae Fest', date: '10/24-26/2025', location: 'New Orleans', website: 'https://www.eventbrite.com/e/2025-nola-reggae-fest-tickets-1369000991819' },
    { id: 10, title: 'Krewe of BOO!', date: '10/25/2025', location: 'New Orleans', website: 'https://www.kreweofboo.com/' },
    { id: 11, title: 'Tremé Fall Festival', date: '10/25/2025', location: 'New Orleans', website: 'https://www.tremefest.org/' },
    { id: 12, title: 'NOLA MusiCon', date: '10/28-30/2025', location: 'New Orleans', website: 'https://www.nolamusicon.com/' },
    { id: 13, title: 'Bayou Bacchanal', date: '10/31-11/1/2025', location: 'New Orleans', website: 'https://www.friendsofculture.org/' },
    { id: 14, title: 'Freret Street Fall Festival', date: '11/1/2025', location: 'New Orleans', website: 'https://freretstreetfestival.org/' },
    { id: 15, title: 'Tremé Creole Gumbo Festival', date: '11/8-9/2025', location: 'New Orleans', website: 'https://www.jazzandheritage.org/events/2025-treme-creole-gumbo-festival/' },
    { id: 16, title: 'Beignet Fest', date: '11/15/2025', location: 'New Orleans', website: 'https://beignetfest.com/' }
  ]);

   public locations = computed(() => ['All', ...new Set(this.items().map(e => e.location))]);
  
  public selectedLocation = signal<string>('All');

  public filteredEvents = computed(() => {
    const loc = this.selectedLocation();
    if (loc === 'All') {
      return this.items();
    }
    return this.items().filter(event => event.location === loc);
  });

  public filterByLocation(location: string): void {
    this.selectedLocation.set(location);
  }

  // trackBy for the event list to avoid unnecessary DOM updates
  public trackByEventId(index: number, event: Event): number {
    return event.id;
  }
}
