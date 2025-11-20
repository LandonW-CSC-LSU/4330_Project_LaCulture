import { ChangeDetectionStrategy, Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CalendarService } from '../../services/calendar.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './events.html', 
  styleUrls: ['./events.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  public items = signal<Event[]>([]);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);

  public locations = computed(() => ['All', ...new Set(this.items().map(e => e.location))]);
  
  public selectedLocation = signal<string>('All');

  public filteredEvents = computed(() => {
    const loc = this.selectedLocation();
    if (loc === 'All') {
      return this.items();
    }
    return this.items().filter(event => event.location === loc);
  });

  constructor(
    private eventService: EventService,
    private calendarService: CalendarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.items.set(events);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error.set('Failed to load events. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  public filterByLocation(location: string): void {
    this.selectedLocation.set(location);
  }

  // trackBy for the event list to avoid unnecessary DOM updates
  public trackByEventId(index: number, event: Event): number {
    return event.id;
  }

  public viewOnMap(eventId: number): void {
    this.router.navigate(['/map'], { queryParams: { eventId } });
  }

  public addToGoogleCalendar(event: Event): void {
    const url = this.calendarService.getGoogleCalendarUrl(event);
    this.calendarService.openCalendarLink(url);
  }

  public addToOutlook(event: Event): void {
    const url = this.calendarService.getOutlookUrl(event);
    this.calendarService.openCalendarLink(url);
  }

  public addToYahooCalendar(event: Event): void {
    const url = this.calendarService.getYahooCalendarUrl(event);
    this.calendarService.openCalendarLink(url);
  }

  public downloadICS(event: Event): void {
    this.calendarService.downloadICS(event);
  }
}
