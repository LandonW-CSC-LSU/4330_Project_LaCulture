using LaCulture.API.Data;
using LaCulture.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LaCulture.API.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event?> GetEventByIdAsync(int id);
        Task<Event> CreateEventAsync(Event eventItem);
        Task<Event?> UpdateEventAsync(int id, Event eventItem);
        Task<bool> DeleteEventAsync(int id);
        Task<IEnumerable<Event>> GetEventsByLocationAsync(string location);
    }

    public class EventService : IEventService
    {
        private readonly AppDbContext _context;

        public EventService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await _context.Events
                .OrderBy(e => e.Date)
                .ToListAsync();
        }

        public async Task<Event?> GetEventByIdAsync(int id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task<Event> CreateEventAsync(Event eventItem)
        {
            eventItem.CreatedAt = DateTime.UtcNow;
            eventItem.UpdatedAt = DateTime.UtcNow;
            
            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();
            
            return eventItem;
        }

        public async Task<Event?> UpdateEventAsync(int id, Event eventItem)
        {
            var existingEvent = await _context.Events.FindAsync(id);
            
            if (existingEvent == null)
            {
                return null;
            }

            existingEvent.Title = eventItem.Title;
            existingEvent.Date = eventItem.Date;
            existingEvent.Location = eventItem.Location;
            existingEvent.Website = eventItem.Website;
            existingEvent.Latitude = eventItem.Latitude;
            existingEvent.Longitude = eventItem.Longitude;
            existingEvent.Description = eventItem.Description;
            existingEvent.Category = eventItem.Category;
            existingEvent.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            
            return existingEvent;
        }

        public async Task<bool> DeleteEventAsync(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);
            
            if (eventItem == null)
            {
                return false;
            }

            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<IEnumerable<Event>> GetEventsByLocationAsync(string location)
        {
            return await _context.Events
                .Where(e => e.Location == location)
                .OrderBy(e => e.Date)
                .ToListAsync();
        }
    }
}
