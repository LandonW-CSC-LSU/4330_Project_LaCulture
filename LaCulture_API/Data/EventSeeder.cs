using Microsoft.EntityFrameworkCore;
using LaCulture.API.Data;
using LaCulture.API.Models;

namespace LaCulture.API.Data
{
    public static class EventSeeder
    {
        public static void SeedEvents(AppDbContext context)
        {
            // Check if events already exist
            if (context.Events.Any())
            {
                return; // Database has been seeded
            }

            var events = new List<Event>
            {
                new Event
                {
                    Title = "LSU vs Texas A&M",
                    Date = "10/25/2025",
                    Location = "Baton Rouge",
                    Website = "https://lsusports.evenue.net/list/FB",
                    Latitude = 30.4120,
                    Longitude = -91.1830,
                    Description = "LSU Tigers football game at Tiger Stadium",
                    Category = "Sports",
                    Popularity = 1.00
                },
                new Event
                {
                    Title = "Saints vs Buccaneers",
                    Date = "10/26/2025",
                    Location = "New Orleans",
                    Website = "https://www.neworleanssaints.com/tickets/",
                    Latitude = 29.9511,
                    Longitude = -90.0812,
                    Description = "New Orleans Saints NFL game at the Superdome",
                    Category = "Sports",
                    Popularity = 0.95
                },
                new Event
                {
                    Title = "National Fried Chicken Festival",
                    Date = "10/4-5/2025",
                    Location = "New Orleans",
                    Website = "https://www.friedchickenfestival.com/",
                    Latitude = 29.9935,
                    Longitude = -90.0640,
                    Description = "Annual celebration of fried chicken with tastings and entertainment",
                    Category = "Food & Drink",
                    Popularity = 0.80
                },
                new Event
                {
                    Title = "Oktoberfest",
                    Date = "10/10-25/2025",
                    Location = "New Orleans",
                    Website = "https://deutscheshaus.org/oktoberfest/",
                    Latitude = 29.9903,
                    Longitude = -90.0930,
                    Description = "German festival celebrating beer, food, and culture",
                    Category = "Festival",
                    Popularity = 0.65
                },
                new Event
                {
                    Title = "Nola Funk Fest 2025",
                    Date = "10/17-19/2025",
                    Location = "New Orleans",
                    Website = "https://www.nolafunkfest.com/",
                    Latitude = 29.9412,
                    Longitude = -90.0672,
                    Description = "Music festival celebrating funk and soul music",
                    Category = "Music",
                    Popularity = 0.55
                },
                new Event
                {
                    Title = "Praise Fest",
                    Date = "10/17-19/2025",
                    Location = "New Orleans",
                    Website = "https://www.praisefestnola.com/",
                    Latitude = 29.9538,
                    Longitude = -90.0638,
                    Description = "Gospel music festival",
                    Category = "Music",
                    Popularity = 0.45
                },
                new Event
                {
                    Title = "New Orleans Film Festival",
                    Date = "10/23/2025-11/2/2025",
                    Location = "New Orleans",
                    Website = "https://neworleansfilmsociety.org/attend/",
                    Latitude = 29.9520,
                    Longitude = -90.0700,
                    Description = "Annual film festival showcasing independent films",
                    Category = "Arts & Culture",
                    Popularity = 0.60
                },
                new Event
                {
                    Title = "LGBT Halloween New Orleans (HNO)",
                    Date = "10/24-26/2025",
                    Location = "New Orleans",
                    Website = "https://www.halloweenneworleans.com/",
                    Latitude = 29.9570,
                    Longitude = -90.0620,
                    Description = "Halloween celebration with parties and events",
                    Category = "Festival",
                    Popularity = 0.75
                },
                new Event
                {
                    Title = "NOLA Reggae Fest",
                    Date = "10/24-26/2025",
                    Location = "New Orleans",
                    Website = "https://www.eventbrite.com/e/2025-nola-reggae-fest-tickets-1369000991819",
                    Latitude = 29.9880,
                    Longitude = -90.0930,
                    Description = "Reggae music festival",
                    Category = "Music",
                    Popularity = 0.40
                },
                new Event
                {
                    Title = "Krewe of BOO!",
                    Date = "10/25/2025",
                    Location = "New Orleans",
                    Website = "https://www.kreweofboo.com/",
                    Latitude = 29.9510,
                    Longitude = -90.0720,
                    Description = "Halloween parade through the French Quarter",
                    Category = "Festival",
                    Popularity = 0.85
                },
                new Event
                {
                    Title = "Tremé Fall Festival",
                    Date = "10/25/2025",
                    Location = "New Orleans",
                    Website = "https://www.tremefest.org/",
                    Latitude = 29.9713,
                    Longitude = -90.0707,
                    Description = "Neighborhood festival celebrating Tremé culture",
                    Category = "Festival",
                    Popularity = 0.55
                },
                new Event
                {
                    Title = "NOLA MusiCon",
                    Date = "10/28-30/2025",
                    Location = "New Orleans",
                    Website = "https://www.nolamusicon.com/",
                    Latitude = 29.9412,
                    Longitude = -90.0672,
                    Description = "Music industry conference and festival",
                    Category = "Music",
                    Popularity = 0.35
                },
                new Event
                {
                    Title = "Bayou Bacchanal",
                    Date = "10/31-11/1/2025",
                    Location = "New Orleans",
                    Website = "https://www.friendsofculture.org/",
                    Latitude = 29.9688,
                    Longitude = -90.0715,
                    Description = "Caribbean cultural festival",
                    Category = "Festival",
                    Popularity = 0.50
                },
                new Event
                {
                    Title = "Freret Street Fall Festival",
                    Date = "11/1/2025",
                    Location = "New Orleans",
                    Website = "https://freretstreetfestival.org/",
                    Latitude = 29.9386,
                    Longitude = -90.1030,
                    Description = "Street festival with local vendors and music",
                    Category = "Festival",
                    Popularity = 0.70
                },
                new Event
                {
                    Title = "Tremé Creole Gumbo Festival",
                    Date = "11/8-9/2025",
                    Location = "New Orleans",
                    Website = "https://www.jazzandheritage.org/events/2025-treme-creole-gumbo-festival/",
                    Latitude = 29.9670,
                    Longitude = -90.0708,
                    Description = "Festival celebrating Creole cuisine and gumbo",
                    Category = "Food & Drink",
                    Popularity = 0.65
                },
                new Event
                {
                    Title = "Beignet Fest",
                    Date = "11/15/2025",
                    Location = "New Orleans",
                    Website = "https://beignetfest.com/",
                    Latitude = 29.9895,
                    Longitude = -90.0945,
                    Description = "Festival celebrating the iconic New Orleans beignet",
                    Category = "Food & Drink",
                    Popularity = 0.75
                }
            };

            context.Events.AddRange(events);
            context.SaveChanges();
        }
    }
}
