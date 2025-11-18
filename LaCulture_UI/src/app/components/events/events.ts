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
    { id: 4, title: 'Beignet Fest', date: '11/15/2025', location: 'New Orleans', website: 'https://beignetfest.com/', image: 'assets/images/beignets.jpg'}
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
