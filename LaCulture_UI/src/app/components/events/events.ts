import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  website?: string;
}

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.html', 
  styleUrls: ['./events.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  public items = signal<Event[]>([
    { id: 1, title: 'LSU vs South Carolina', date: '10/11/2025', location: 'Baton Rouge', website: 'https://lsusports.evenue.net/list/FB'},
    { id: 2, title: 'Saints vs Patriots', date: '10/12/2025', location: 'New Orleans', website: 'https://www.neworleanssaints.com/tickets/' },
    { id: 3, title: 'National Fried Chicken Festival', date: '10/4-5/2025', location: 'New Orleans', website: 'https://www.friedchickenfestival.com/' },
    { id: 4, title: 'Crescent City Blues & BBQ Festival', date: '10/10-12/2025', location: 'New Orleans', website: 'https://www.jazzandheritage.org/events/crescent-city-blues-bbq-festival-2025/'},
    { id: 5, title: 'Gentilly Fest', date: '10/10-12/2025', location: 'New Orleans', website: 'https://www.gentillyfestival.com/'},
    { id: 6, title: 'Oktoberfest', date: '10/10-25/2025', location: 'New Orleans', website: 'https://deutscheshaus.org/oktoberfest/' },
    { id: 7, title: 'Nola Funk Fest 2025', date: '10/17-19/2025', location: 'New Orleans', website: 'https://www.nolafunkfest.com/' },
    { id: 8, title: 'Praise Fest', date: '10/17-19/2025', location: 'New Orleans', website: 'https://www.praisefestnola.com/' },
    { id: 9, title: 'New Orleans Film Festival ', date: '10/23/2025-11/2/2025', location: 'New Orleans', website: 'https://neworleansfilmsociety.org/attend/' },
    { id: 10, title: 'LGBT Halloween New Orleans (HNO)', date: '10/24-26/2025', location: 'New Orleans', website: 'https://www.halloweenneworleans.com/' },
    { id: 11, title: 'NOLA Reggae Fest', date: '10/24-26/2025', location: 'New Orleans', website: 'https://www.eventbrite.com/e/2025-nola-reggae-fest-tickets-1369000991819' },
    { id: 12, title: 'Krewe of BOO!', date: '10/25/2025', location: 'New Orleans', website: 'https://www.kreweofboo.com/' },
    { id: 13, title: 'Treme Fall Fest', date: '10/25/2025', location: 'New Orleans', website: 'https://www.tremefest.org/' },
    { id: 14, title: 'NOLA MusiCon', date: '10/28-30/2025', location: 'New Orleans', website: 'https://www.nolamusicon.com/' },
    { id: 15, title: 'Bayou Bacchanal', date: '10/31-11/1/2025', location: 'New Orleans', website: 'https://www.friendsofculture.org/' },
    { id: 16, title: 'Freret Street Fall Festival', date: '11/1/2025', location: 'New Orleans', website: 'https://freretstreetfestival.org/' },
    { id: 17, title: 'Tremé Creole Gumbo Festival', date: '11/8-9/2025', location: 'New Orleans', website: 'https://www.jazzandheritage.org/events/2025-treme-creole-gumbo-festival/' },
    { id: 18, title: 'Beignet Fest', date: '11/15/2025', location: 'New Orleans', website: 'https://beignetfest.com/' }
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
}
