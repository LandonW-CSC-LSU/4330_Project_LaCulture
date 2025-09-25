import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.html', 
  styleUrls: ['./events.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  items = signal([
    { id: 1, title: 'Angular Meetup', date: '2025-09-25', location: 'New York' },
    { id: 2, title: 'Tech Conference', date: '2025-10-10', location: 'San Francisco' },
    { id: 3, title: 'Hackathon', date: '2025-11-05', location: 'Online' }
  ]);
}
