using LaCulture.API.DTOs;
using LaCulture.API.Models;
using LaCulture.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace LaCulture.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly ILogger<EventsController> _logger;

        public EventsController(IEventService eventService, ILogger<EventsController> logger)
        {
            _eventService = eventService;
            _logger = logger;
        }

        // GET: api/events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEvents()
        {
            try
            {
                var events = await _eventService.GetAllEventsAsync();
                var eventDtos = events.Select(e => MapToDto(e));
                return Ok(eventDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all events");
                return StatusCode(500, "An error occurred while retrieving events");
            }
        }

        // GET: api/events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEvent(int id)
        {
            try
            {
                var eventItem = await _eventService.GetEventByIdAsync(id);

                if (eventItem == null)
                {
                    return NotFound($"Event with ID {id} not found");
                }

                return Ok(MapToDto(eventItem));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving event {EventId}", id);
                return StatusCode(500, "An error occurred while retrieving the event");
            }
        }

        // GET: api/events/location/New Orleans
        [HttpGet("location/{location}")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEventsByLocation(string location)
        {
            try
            {
                var events = await _eventService.GetEventsByLocationAsync(location);
                var eventDtos = events.Select(e => MapToDto(e));
                return Ok(eventDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving events for location {Location}", location);
                return StatusCode(500, "An error occurred while retrieving events");
            }
        }

        // POST: api/events
        [HttpPost]
        public async Task<ActionResult<EventDto>> CreateEvent([FromBody] CreateEventDto createEventDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var eventItem = MapFromCreateDto(createEventDto);
                var createdEvent = await _eventService.CreateEventAsync(eventItem);

                return CreatedAtAction(
                    nameof(GetEvent),
                    new { id = createdEvent.Id },
                    MapToDto(createdEvent)
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating event");
                return StatusCode(500, "An error occurred while creating the event");
            }
        }

        // PUT: api/events/5
        [HttpPut("{id}")]
        public async Task<ActionResult<EventDto>> UpdateEvent(int id, [FromBody] UpdateEventDto updateEventDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingEvent = await _eventService.GetEventByIdAsync(id);
                if (existingEvent == null)
                {
                    return NotFound($"Event with ID {id} not found");
                }

                // Apply updates
                if (!string.IsNullOrEmpty(updateEventDto.Title))
                    existingEvent.Title = updateEventDto.Title;
                if (!string.IsNullOrEmpty(updateEventDto.Date))
                    existingEvent.Date = updateEventDto.Date;
                if (!string.IsNullOrEmpty(updateEventDto.Location))
                    existingEvent.Location = updateEventDto.Location;
                if (updateEventDto.Website != null)
                    existingEvent.Website = updateEventDto.Website;
                if (updateEventDto.Latitude.HasValue)
                    existingEvent.Latitude = updateEventDto.Latitude.Value;
                if (updateEventDto.Longitude.HasValue)
                    existingEvent.Longitude = updateEventDto.Longitude.Value;
                if (updateEventDto.Description != null)
                    existingEvent.Description = updateEventDto.Description;
                if (updateEventDto.Category != null)
                    existingEvent.Category = updateEventDto.Category;

                var updatedEvent = await _eventService.UpdateEventAsync(id, existingEvent);

                return Ok(MapToDto(updatedEvent!));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating event {EventId}", id);
                return StatusCode(500, "An error occurred while updating the event");
            }
        }

        // DELETE: api/events/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            try
            {
                var result = await _eventService.DeleteEventAsync(id);

                if (!result)
                {
                    return NotFound($"Event with ID {id} not found");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting event {EventId}", id);
                return StatusCode(500, "An error occurred while deleting the event");
            }
        }

        // Helper methods for mapping
        private static EventDto MapToDto(Event eventItem)
        {
            return new EventDto
            {
                Id = eventItem.Id,
                Title = eventItem.Title,
                Date = eventItem.Date,
                Location = eventItem.Location,
                Website = eventItem.Website,
                Latitude = eventItem.Latitude,
                Longitude = eventItem.Longitude,
                Description = eventItem.Description,
                Category = eventItem.Category
            };
        }

        private static Event MapFromCreateDto(CreateEventDto dto)
        {
            return new Event
            {
                Title = dto.Title,
                Date = dto.Date,
                Location = dto.Location,
                Website = dto.Website,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Description = dto.Description,
                Category = dto.Category
            };
        }
    }
}
