import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  items = signal([
    { id: 1, title: 'LSU vs South Carolina', date: '10/11/2025', location: 'Baton Rouge' },
    { id: 2, title: 'Saints vs Giants', date: '10/5/2025', location: 'New Orleans' },
    { id: 3, title: 'National Fried Chicken Festival ', date: '10/4-5/2025', location: 'New Orleans', website: 'https://www.friedchickenfestival.com/' },
    { id: 4, title: 'Crescent City Blues & BBQ Festival', date: '10/10-12/2025', location: 'New Orleans', website: 'https://www.jazzandheritage.org/events/crescent-city-blues-bbq-festival-2025/'},
    { id: 5, title: 'Gentilly Fest', date: '10/10-12/2025', location: 'New Orleans'},
    { id: 6, title: 'Oktoberfest', date: '10/10-25/2025', location: 'New Orleans' },
    { id: 7, title: 'Nola Funk Fest 2025', date: '10/17-19/2025', location: 'New Orleans' },
  ]);
}
