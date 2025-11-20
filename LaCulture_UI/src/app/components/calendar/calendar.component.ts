import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../../services/event.service';
import { CalendarService } from '../../services/calendar.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  days: number[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  events = signal<Event[]>([]);
  selectedEvent: Event | null = null;
  showEventModal: boolean = false;
  showCalendarDialog: boolean = false;
  loading = signal<boolean>(true);

  constructor(
    private eventService: EventService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    console.log('Calendar component initialized');
    this.generateDays();
    this.loadEvents();
  }

  loadEvents(): void {
    console.log('Loading events...');
    this.loading.set(true);
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        console.log('Events loaded:', events);
        this.events.set(events);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.loading.set(false);
      }
    });
  }

  // Generate the days of the current month
  generateDays() {
  const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay(); 
  const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

  // Create an array with empty slots before the first day
  const blankDays = Array.from({ length: firstDayOfMonth }, () => 0);

  // Create the days of the month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Combine them
  this.days = [...blankDays, ...monthDays];
}


  // Highlight today
  isToday(day: number) {
    const today = new Date();
    return day === today.getDate() &&
           this.currentMonth === today.getMonth() &&
           this.currentYear === today.getFullYear();
  }

  // Go to previous month
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateDays();
  }

  // Go to next month
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateDays();
  }

  // Get events for a specific day
  getEventsForDay(day: number): Event[] {
    if (!day) return [];
    
    return this.events().filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === this.currentMonth &&
             eventDate.getFullYear() === this.currentYear;
    });
  }

  // Open event details modal
  openEventDetails(event: Event): void {
    this.selectedEvent = event;
    this.showEventModal = true;
  }

  // Close event modal
  closeEventModal(): void {
    this.showEventModal = false;
    this.selectedEvent = null;
  }

  // Open calendar dialog
  openCalendarDialog(): void {
    if (this.selectedEvent) {
      this.showCalendarDialog = true;
    }
  }

  // Close calendar dialog
  closeCalendarDialog(): void {
    this.showCalendarDialog = false;
  }

  // Add to Google Calendar
  addToGoogleCalendar(): void {
    if (this.selectedEvent) {
      const url = this.calendarService.getGoogleCalendarUrl(this.selectedEvent);
      this.calendarService.openCalendarLink(url);
      this.closeCalendarDialog();
    }
  }

  // Add to Outlook
  addToOutlook(): void {
    if (this.selectedEvent) {
      const url = this.calendarService.getOutlookUrl(this.selectedEvent);
      this.calendarService.openCalendarLink(url);
      this.closeCalendarDialog();
    }
  }

  // Add to Yahoo Calendar
  addToYahooCalendar(): void {
    if (this.selectedEvent) {
      const url = this.calendarService.getYahooCalendarUrl(this.selectedEvent);
      this.calendarService.openCalendarLink(url);
      this.closeCalendarDialog();
    }
  }

  // Download ICS file
  downloadICS(): void {
    if (this.selectedEvent) {
      this.calendarService.downloadICS(this.selectedEvent);
      this.closeCalendarDialog();
    }
  }
}
