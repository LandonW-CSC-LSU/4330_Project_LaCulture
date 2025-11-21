# Events Database Implementation

## Overview
This implementation creates a shared database for events that both the Events page and Map page reference. Users can now click a "View on Map" button on the Events page to navigate to the Map and see the selected event highlighted.

## What Was Implemented

### Backend (C# .NET)

#### 1. **Event Model** (`Models/Event.cs`)
- Properties: Id, Title, Date, Location, Website, Latitude, Longitude, Description, Category
- Timestamps: CreatedAt, UpdatedAt
- Validation attributes for data integrity

#### 2. **Event DTOs** (`DTOs/EventDto.cs`)
- `EventDto`: Full event data transfer object
- `CreateEventDto`: For creating new events
- `UpdateEventDto`: For partial updates to events

#### 3. **Event Service** (`Services/EventService.cs`)
- `IEventService` interface with methods:
  - `GetAllEventsAsync()`: Retrieve all events
  - `GetEventByIdAsync(id)`: Get single event
  - `GetEventsByLocationAsync(location)`: Filter by location
  - `CreateEventAsync(event)`: Add new event
  - `UpdateEventAsync(id, event)`: Update existing event
  - `DeleteEventAsync(id)`: Remove event

#### 4. **Events Controller** (`Controllers/EventsController.cs`)
RESTful API endpoints:
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `GET /api/events/location/{location}` - Get events by location
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

#### 5. **Database Context** (`Data/AppDbContext.cs`)
- Added `DbSet<Event> Events` to enable database operations

#### 6. **Event Seeder** (`Data/EventSeeder.cs`)
- Automatically seeds database with 16 Louisiana events
- Includes all current events with coordinates, descriptions, and categories
- Runs on application startup

#### 7. **Program.cs Updates**
- Registered `IEventService` in dependency injection
- Added automatic database seeding on startup

### Frontend (Angular)

#### 1. **Event Model** (`models/event.model.ts`)
TypeScript interfaces matching backend DTOs:
- `Event`: Main event interface
- `CreateEventDto`: For creating events
- `UpdateEventDto`: For updating events

#### 2. **Event Service** (`services/event.service.ts`)
Angular service with HTTP methods:
- `getAllEvents()`: Fetch all events from API
- `getEventById(id)`: Get single event
- `getEventsByLocation(location)`: Filter by location
- `createEvent(event)`: Create new event
- `updateEvent(id, event)`: Update event
- `deleteEvent(id)`: Delete event
- Error handling with proper logging

#### 3. **Events Component Updates** (`components/events/`)
**TypeScript (`events.ts`):**
- Now fetches events from API instead of hardcoded array
- Implements `OnInit` lifecycle hook
- Loading and error state management
- `viewOnMap(eventId)` method for navigation

**Template (`events.html`):**
- Added loading state with spinner
- Added error state display
- "View on Map" button for each event
- Shows event descriptions when available

**Styles (`events.css`):**
- Loading state styles with animated spinner
- Error state styling
- Updated button styles for both "View on Map" and "Visit Website"

#### 4. **Map Component Updates** (`components/map/map.ts`)
- Fetches events from API instead of hardcoded data
- Accepts `eventId` query parameter from route
- Highlights selected event with larger icon
- Automatically pans and zooms to highlighted event
- Opens tooltip for highlighted event
- Maintains all existing map functionality

## How to Use

### Running the Application

#### 1. **Start the Backend API**
```powershell
cd c:\LSU_Repos\4330_Project_LaCulture\LaCulture_API

# First, stop any running instance
# Then create and apply the migration
dotnet ef migrations add AddEventsTable
dotnet ef database update

# Start the API
dotnet run
```

The API will be available at `http://localhost:5104`

#### 2. **Start the Angular Frontend**
```powershell
cd c:\LSU_Repos\4330_Project_LaCulture\LaCulture_UI
ng serve
```

The UI will be available at `http://localhost:4200`

### User Flow

1. **View Events**
   - Navigate to the Events page
   - See all 16 Louisiana events loaded from the database
   - Filter by location (All, New Orleans, Baton Rouge)

2. **Navigate to Map**
   - Click "View on Map" button on any event card
   - Automatically redirected to Map page
   - Selected event is highlighted with larger icon
   - Map automatically pans and zooms to the event location
   - Event tooltip opens automatically

3. **Map Interaction**
   - Click any marker to open its website
   - Use location dropdown to change view (New Orleans, Baton Rouge, Louisiana)
   - Reset button returns to default view

## API Endpoints Reference

### Get All Events
```http
GET http://localhost:5104/api/events
```

### Get Event by ID
```http
GET http://localhost:5104/api/events/1
```

### Get Events by Location
```http
GET http://localhost:5104/api/events/location/New Orleans
```

### Create Event
```http
POST http://localhost:5104/api/events
Content-Type: application/json

{
  "title": "New Event",
  "date": "12/1/2025",
  "location": "New Orleans",
  "website": "https://example.com",
  "latitude": 29.9511,
  "longitude": -90.0715,
  "description": "Event description",
  "category": "Festival"
}
```

### Update Event
```http
PUT http://localhost:5104/api/events/1
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete Event
```http
DELETE http://localhost:5104/api/events/1
```

## Database Schema

### Events Table
| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary key (auto-increment) |
| Title | nvarchar(200) | Event name (required) |
| Date | nvarchar(100) | Event date(s) (required) |
| Location | nvarchar(100) | City/location (required) |
| Website | nvarchar(500) | Event website URL |
| Latitude | float | GPS latitude (required) |
| Longitude | float | GPS longitude (required) |
| Description | nvarchar(1000) | Event description |
| Category | nvarchar(50) | Event category |
| CreatedAt | datetime2 | Record creation timestamp |
| UpdatedAt | datetime2 | Last update timestamp |

## Seeded Events

The database is automatically seeded with 16 Louisiana events:
1. LSU vs Texas A&M (Baton Rouge)
2. Saints vs Buccaneers (New Orleans)
3. National Fried Chicken Festival (New Orleans)
4. Oktoberfest (New Orleans)
5. Nola Funk Fest 2025 (New Orleans)
6. Praise Fest (New Orleans)
7. New Orleans Film Festival (New Orleans)
8. LGBT Halloween New Orleans (New Orleans)
9. NOLA Reggae Fest (New Orleans)
10. Krewe of BOO! (New Orleans)
11. Tremé Fall Festival (New Orleans)
12. NOLA MusiCon (New Orleans)
13. Bayou Bacchanal (New Orleans)
14. Freret Street Fall Festival (New Orleans)
15. Tremé Creole Gumbo Festival (New Orleans)
16. Beignet Fest (New Orleans)

## Files Created/Modified

### Backend
- ✅ **Created:** `Models/Event.cs`
- ✅ **Created:** `DTOs/EventDto.cs`
- ✅ **Created:** `Services/EventService.cs`
- ✅ **Created:** `Controllers/EventsController.cs`
- ✅ **Created:** `Data/EventSeeder.cs`
- ✅ **Modified:** `Data/AppDbContext.cs`
- ✅ **Modified:** `Program.cs`

### Frontend
- ✅ **Created:** `models/event.model.ts`
- ✅ **Created:** `services/event.service.ts`
- ✅ **Modified:** `components/events/events.ts`
- ✅ **Modified:** `components/events/events.html`
- ✅ **Modified:** `components/events/events.css`
- ✅ **Modified:** `components/map/map.ts`

## Next Steps (Optional Enhancements)

1. **Admin Panel**: Create UI for adding/editing/deleting events
2. **Event Images**: Add image upload functionality
3. **Categories Filter**: Add category-based filtering
4. **Date Range Filter**: Filter events by date range
5. **Search**: Add text search functionality
6. **Event Details Page**: Create detailed view for each event
7. **Calendar Integration**: Export events to calendar apps
8. **User Favorites**: Allow users to save favorite events

## Troubleshooting

### API Not Starting
- Stop any running instances
- Check if port 5104 is available
- Verify database connection string in `appsettings.json`

### Frontend Not Connecting to API
- Verify API is running at `http://localhost:5104`
- Check CORS settings in `Program.cs`
- Verify API URL in `event.service.ts`

### Database Migration Issues
- Ensure SQL Server is running
- Check connection string in `appsettings.json`
- Delete Migrations folder and recreate if needed

### Events Not Loading on Map
- Open browser console for errors
- Verify API is returning data
- Check that latitude/longitude are valid numbers
