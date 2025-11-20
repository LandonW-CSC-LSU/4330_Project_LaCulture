import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  /**
   * Generate an ICS file content for a calendar event
   */
  private generateICS(event: Event): string {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    // Parse the event date (handle various formats)
    const eventDate = this.parseEventDate(event.date);
    const startDate = this.formatDateForICS(eventDate);
    const endDate = this.formatDateForICS(new Date(eventDate.getTime() + 3 * 60 * 60 * 1000)); // 3 hours later

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Louisiana Culture Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.id}-${timestamp}@laculture.com`,
      `DTSTAMP:${timestamp}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${this.escapeICS(event.title)}`,
      `DESCRIPTION:${this.escapeICS(event.description || 'Event in Louisiana')}`,
      `LOCATION:${this.escapeICS(event.location)}`,
      event.website ? `URL:${event.website}` : '',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(line => line).join('\r\n');

    return icsContent;
  }

  /**
   * Parse event date string to Date object
   */
  private parseEventDate(dateString: string): Date {
    // Handle formats like "10/25/2025", "10/24-26/2025", "10/23/2025-11/2/2025"
    const firstDate = dateString.split('-')[0].trim();
    const parts = firstDate.split('/');
    
    if (parts.length === 3) {
      const month = parseInt(parts[0]) - 1; // JS months are 0-indexed
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      return new Date(year, month, day, 10, 0, 0); // Default to 10 AM
    }
    
    // Fallback to current date if parsing fails
    return new Date();
  }

  /**
   * Format date for ICS file (YYYYMMDDTHHMMSSZ)
   */
  private formatDateForICS(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  }

  /**
   * Escape special characters for ICS format
   */
  private escapeICS(text: string): string {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }

  /**
   * Download ICS file for the event
   */
  downloadICS(event: Event): void {
    const icsContent = this.generateICS(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Generate Google Calendar URL
   */
  getGoogleCalendarUrl(event: Event): string {
    const eventDate = this.parseEventDate(event.date);
    const startDate = this.formatDateForGoogle(eventDate);
    const endDate = this.formatDateForGoogle(new Date(eventDate.getTime() + 3 * 60 * 60 * 1000));
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${startDate}/${endDate}`,
      details: event.description || 'Event in Louisiana',
      location: event.location,
    });

    if (event.website) {
      params.append('sprop', `website:${event.website}`);
    }

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  /**
   * Format date for Google Calendar (YYYYMMDDTHHMMSSZ)
   */
  private formatDateForGoogle(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  /**
   * Generate Outlook.com calendar URL
   */
  getOutlookUrl(event: Event): string {
    const eventDate = this.parseEventDate(event.date);
    const startDate = eventDate.toISOString();
    const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000).toISOString();
    
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      startdt: startDate,
      enddt: endDate,
      body: event.description || 'Event in Louisiana',
      location: event.location,
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  }

  /**
   * Generate Yahoo Calendar URL
   */
  getYahooCalendarUrl(event: Event): string {
    const eventDate = this.parseEventDate(event.date);
    const startDate = this.formatDateForYahoo(eventDate);
    const endDate = this.formatDateForYahoo(new Date(eventDate.getTime() + 3 * 60 * 60 * 1000));
    
    const params = new URLSearchParams({
      v: '60',
      title: event.title,
      st: startDate,
      et: endDate,
      desc: event.description || 'Event in Louisiana',
      in_loc: event.location,
    });

    if (event.website) {
      params.append('url', event.website);
    }

    return `https://calendar.yahoo.com/?${params.toString()}`;
  }

  /**
   * Format date for Yahoo Calendar (YYYYMMDDTHHMMSSZ)
   */
  private formatDateForYahoo(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  /**
   * Open calendar link in new window
   */
  openCalendarLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
