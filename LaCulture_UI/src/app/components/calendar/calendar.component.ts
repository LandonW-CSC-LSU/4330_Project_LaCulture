import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  date: string; // or Date if you prefer
  title: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
   imports: [CommonModule]
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

  events: CalendarEvent[] = [
    { date: '2025-10-10', title: 'Meeting' },
    { date: '2025-10-12', title: 'Appointment' },
    { date: '2025-10-12', title: 'Schedule' },
    { date: '2025-10-15', title: 'Conference' },
    { date: '2025-10-17', title: 'Project Demo' },
    // Add more events here
  ];

  ngOnInit(): void {
    this.generateDays();
  }

  // Generate the days of the current month
  generateDays() {
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
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
  getEventsForDay(day: number): CalendarEvent[] {
    const dayString = `${this.currentYear}-${(this.currentMonth + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return this.events.filter(event => event.date === dayString);
  }
}
