import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event, CreateEventDto, UpdateEventDto } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5189/api/events';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Get all events
   */
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get a single event by ID
   */
  getEventById(id: number): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get events by location
   */
  getEventsByLocation(location: string): Observable<Event[]> {
    const url = `${this.apiUrl}/location/${encodeURIComponent(location)}`;
    return this.http.get<Event[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create a new event
   */
  createEvent(event: CreateEventDto): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing event
   */
  updateEvent(id: number, event: UpdateEventDto): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Event>(url, event, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete an event
   */
  deleteEvent(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
