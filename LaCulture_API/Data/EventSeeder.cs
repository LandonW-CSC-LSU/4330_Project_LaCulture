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
                    Title = "Algiers Bonfire & Concert",
                    Date = "12/6/2025",
                    Location = "New Orleans",
                    Website = "https://www.algierseconomic.com/algiersbonfire/",
                    Latitude = 29.9539,
                    Longitude = -90.0545,
                    Description = "The Algiers Bonfire and Concert is Algiers’ biggest annual holiday celebration and New Orleans’ only official holiday bonfire.",
                    Category = "Music, Food & Market",
                    Popularity = 0.70,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_avif,h_933,q_65,w_1152/v1/crm/neworleans/NOTMC_36668_9c23725c-5056-bfce-a815cc170aaee0fb.jpg"
                },
                new Event
                {
                    Title = "Saints vs Panthers",
                    Date = "12/14/2025",
                    Location = "New Orleans",
                    Website = "https://www.neworleanssaints.com/tickets/",
                    Latitude = 29.9511,
                    Longitude = -90.0812,
                    Description = "New Orleans Saints NFL game at the Superdome",
                    Category = "Sports",
                    Popularity = 0.95,
                    Image = "https://static.clubs.nfl.com/f_auto/saints/cstbojoaffmjfar8xp0f.jpg"
                },
                new Event
                {
                    Title = "Manning Family Children's Holiday Parade",
                    Date = "12/6/2025",
                    Location = "New Orleans",
                    Website = "https://nolaholidayparade.com/",
                    Latitude = 29.9593,
                    Longitude = -90.0602,
                    Description = "Annual holiday parade that benefits the vital mission of Manning Family Children's.",
                    Category = "Parade",
                    Popularity = 0.80,
                    Image = "https://radioimg.audacy.com/aiu-media/HolidayParade800x450Recirc-14e39a57-f720-4e39-a463-6eee3aa6cdea.jpg"
                },
                new Event
                {
                    Title = "Greenway Supernova",
                    Date = "12/11-13/2025",
                    Location = "New Orleans",
                    Website = "https://lafittegreenway.org/events/supernova/",
                    Latitude = 29.9744,
                    Longitude = -90.1006,
                    Description = "Holiday lights exhibit. Free with food and music as well.",
                    Category = "Exhibit, Food & Music",
                    Popularity = 0.65,
                    Image = "https://lafittegreenway.org/wp-content/uploads/2025/03/DZ6_2674-819x1024.jpg"
                },
                new Event
                {
                    Title = "Preservation Resource Center Holiday Home Tour",
                    Date = "12/13-14/2025",
                    Location = "New Orleans",
                    Website = "https://prcno.org/holiday-home-tour/",
                    Latitude = 29.9292,
                    Longitude = -90.0829,
                    Description = "50th Anniversary of welcoming guests into Garden District's homes decorated for the holidays.",
                    Category = "Tour",
                    Popularity = 0.75,
                    Image = "https://prcno.org/wp-content/uploads/2025/06/IMG_3690-1920x1280.jpg"
                },
                new Event
                {
                    Title = "NOLA ChristmasFest",
                    Date = "12/20-29/2025",
                    Location = "New Orleans",
                    Website = "https://nolachristmasfest.com/",
                    Latitude = 29.9396,
                    Longitude = -90.0629,
                    Description = "Holiday displays featuring a new giant gingerbread house, ice slide zone, ice-skating rink, carnival rides, ice bumper cars, and festive live entertainment.",
                    Category = "Festival",
                    Popularity = 0.90,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/neworleans/Rink-Above_879E34D0-43D8-42A7-821724546B8A9350_50a3845d-d5cf-45c9-a5da9a8bc1d67973.jpg"
                },
                new Event
                {
                    Title = "Caroling in Jackson Square",
                    Date = "12/21/2025",
                    Location = "New Orleans",
                    Website = "https://patioplanters.net/events/caroling-in-jackson-square/",
                    Latitude = 29.9573,
                    Longitude = -90.0631,
                    Description = "Christmas Carolers gather in Jackson Square to sing songs! Candles and song sheets provided. ",
                    Category = "Singing",
                    Popularity = 0.80,
                    Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbov8Eg-J8NetZFqhwDLQ6__d8ubY65b92Q&s"
                },
                new Event
                {
                    Title = "French Quarter Holiday Home Tours",
                    Date = "12/21/2025",
                    Location = "New Orleans",
                    Website = "https://patioplanters.net/events/holiday-home-tour/",
                    Latitude = 29.9547,
                    Longitude = -90.0693,
                    Description = "French Quarter residences decorated for the holidays. ",
                    Category = "Tour",
                    Popularity = 0.70,
                    Image = "https://patioplanters.net/wp-content/uploads/2021/10/unnamed-3-1024x576.jpeg"

                },
                new Event
                {
                    Title = "Christmas Eve Bonfires on the Levee",
                    Date = "12/24/2025",
                    Location = "New Orleans",
                    Website = "https://www.explorelouisiana.com/articles/louisiana-christmas-tradition-bonfires-levee",
                    Latitude = 29.9880,
                    Longitude = -90.0930,
                    Description = "Bonfires on the levee inteded to light the way for 'Papa Noel', the Cajun Santa Claus",
                    Category = "Event",
                    Popularity = 0.85,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/neworleans/bonfires_0310_eea98163-5056-b365-ab5a3bba104c9cf8.jpg"
                },
                new Event
                {
                    Title = "New Orleans Eve",
                    Date = "12/31/2025",
                    Location = "New Orleans",
                    Website = "https://fqfi.org/holidays/",
                    Latitude = 29.9533,
                    Longitude = -90.0630,
                    Description = "Gather at Jackson Square for the Fleur de Lis drop. New Orleans version of NYC ball drop",
                    Category = "Celebration",
                    Popularity = 0.95,
                    Image = "https://www.cms.cajunencounters.com/wp-content/uploads/2023/12/New-Years-Eve-in-New-Orleans-Crescent-City-Countdown.jpg"
                },
                new Event
                {
                    Title = "Allstate Sugar Bowl",
                    Date = "1/1/2026",
                    Location = "New Orleans",
                    Website = "https://allstatesugarbowl.org/",
                    Latitude = 29.9511,
                    Longitude = -90.0812,
                    Description = "2nd oldest bowl college game in the country.",
                    Category = "Sports",
                    Popularity = 0.85,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_886,q_65,w_639,x_2338,y_1202/v1/clients/neworleans/NO_CO_TAILGATE_TOWN3_e5d50e0e-e3d1-4a79-9c9a-e95e5e0c8604.jpg"
                },
                new Event
                {
                    Title = "Fan Expo New Orleans 2026",
                    Date = "1/09-11/2026",
                    Location = "New Orleans",
                    Website = "https://fanexpohq.com/fanexponeworleans/",
                    Latitude = 29.9396,
                    Longitude = -90.0629,
                    Description = "Brings together fandoms across horror, gaming, anime, comics, and cosplay with celebrity appearances. ",
                    Category = "Expo",
                    Popularity = 0.89,
                    Image = "https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/assets/v3/editorial/5/08/50821444-a6a7-11ee-bc60-e3bdb75bfd1e/658f5f1389fcc.image.jpg?resize=749%2C500"
                },
                new Event
                {
                    Title = "Teaser Fest",
                    Date = "1/15-18/2026",
                    Location = "New Orleans",
                    Website = "https://www.teaserfest.com/",
                    Latitude = 29.9495,
                    Longitude = -90.0742,
                    Description = "Over 100 performances over four days. Celebration of burlesque, fine food, crafted beverages, and live entertainement",
                    Category = "Celebration",
                    Popularity = 0.50,
                    Image = "https://s1.ticketm.net/dam/e/4c4/bd7f89c1-8ce4-4ace-a685-c1d14dae64c4_EVENT_DETAIL_PAGE_16_9.jpg"
                },
                new Event
                {
                    Title = "Algiers Mardi Gras Festival",
                    Date = "1/24/2026",
                    Location = "New Orleans",
                    Website = "https://www.algiersmardigrasfest.com/",
                    Latitude = 29.9362,
                    Longitude = -90.0265,
                    Description = "Free, festive, family friendly event. Will feature local Algiers schools marching bands, cultural groups, and dance groups ",
                    Category = "Food & Drink",
                    Popularity = 0.65,
                    Image = "https://assets.myneworleans.com/2023/12/IMG_4159-1068x801.jpg"
                },
                new Event
                {
                    Title = "Pet Night with Santa",
                    Date = "12/1 & 8/2025",
                    Location = "Baton Rouge",
                    Website = "https://perkinsrowe.com/santa/",
                    Latitude = 30.3796,
                    Longitude = -91.0950,
                    Description = "Have your pets take pictures with Santa!!!",
                    Category = "Pets",
                    Popularity = 0.45,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_434,q_80,w_640/v1/crm/batonrouge/Pet-Night-with-Santa-1-_1F13BA48-E88D-9978-D219BA1097B57CDA_1f29a61c-e12d-5edb-f723c887ca72baf6.png"
                }, 
                new Event 
                {
                    Title = "Cool Winter Nights, Hot Jazz",
                    Date = "12/2-3/2025",
                    Location = "Baton Rouge",
                    Website = "https://www.eventbrite.com/e/ballerinas-at-the-castle-tickets-1968790375010?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl",
                    Latitude = 30.4478,
                    Longitude = -91.1890,
                    Description = "13th Annual Cool Winter Nights, Hot Jazz will feature Brian Shaw and Willis Delony with the Cool Winter Nights jazz ensemble",
                    Category = "Music",
                    Popularity = 0.50,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_434,q_80,w_640/v1/crm/batonrouge/Website_Music_Cool-Winter-Nights-2025_44030DEE-9017-2D88-C2D8D7647B8447D5_440e1c04-ca9e-dadd-0281559f0bcc0b5d.jpg"
                },
                new Event
                {
                    Title = "CPCK Holiday Train",
                    Date = "12/2/2025",
                    Location = "Baton Rouge",
                    Website = "https://www.cpkcr.com/en/community/HolidayTrain",
                    Latitude = 30.46,
                    Longitude = -91.17,
                    Description = "Magical Holiday Train going through Canada and the U.S. Stopping in Baton Rouge for a day.",
                    Category = "Train",
                    Popularity = 0.65,
                    Image = "https://batonrougefamilyfun.com/wp-content/uploads/2023/10/PNP7GY573NHVNA5JHYM4DXCXBU-1024x576.jpg"
                }, 
                new Event
                {
                    Title = "Candlelight: Coldplay & Imagine Dragons ",
                    Date = "12/4/2025",
                    Location = "Baton Rouge",
                    Website = "https://feverup.com/m/410699",
                    Latitude = 30.4127,
                    Longitude = -91.1858,
                    Description = "Candlelight concert to Coldplay & Imagine Dragons music",
                    Category = "Concert",
                    Popularity = 0.55,
                    Image = "https://canoeplace.com/wp-content/uploads/2024/05/Screenshot-2024-04-06-at-11.56.16-AM-600x600.png"
                }, 
                new Event
                {
                    Title = "A Very Monkey Christmas at Louisiana Lights",
                    Date = "12/5/2025",
                    Location = "Baton Rouge",
                    Website = "https://friendsoflpb.ticketspice.com/a-very-monkey-christmas",
                    Latitude = 30.4070,
                    Longitude = -91.1034,
                    Description = "Celebrate the holidays with Curious Geroge and Santa Claus with Louisiana Lights!",
                    Category = "Event",
                    Popularity = 0.75,
                    Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD1hUuuo-wty8BGEV1CokJXdTHoU-w0B5lHQ&s"
                }, 
              new Event
                {
                    Title = "Baton Rouge Zydeco vs Monroe Moccasins",
                    Date = "12/5/2025",
                    Location = "Baton Rouge",
                    Website = "https://www.ticketmaster.com/baton-rouge-zydeco-tickets/artist/3060282",
                    Latitude = 30.3935,
                    Longitude = -91.0622,
                    Description = "Most exhilarating hockey team of the South!",
                    Category = "Sports",
                    Popularity = 1.00,
                    Image = "https://upload.wikimedia.org/wikipedia/en/e/e0/Baton_Rouge_Zydeco_Logo_New.png"
                },   
                new Event
                {
                    Title = "Louisiana Cultural Music & Arts Festival ",
                    Date = "12/7/2025",
                    Location = "Baton Rouge",
                    Website = "https://www.sistarsinc.com/la-cultural-music-art-fest",
                    Latitude = 30.4128,
                    Longitude = -91.1875,
                    Description = "Festival celebrating the rich musical and artistic heritage of Louisiana ",
                    Category = "Festival",
                    Popularity = 0.83,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/batonrouge/Music-Art-Festival-1-_2434E461-0638-7F13-1CD16DAAD2EDBF7D_243d4a48-b2d1-435c-346c69e30b973cc2.jpg"
                }, 
                new Event
                {
                    Title = "The Nutcracker, A Tale From The Bayou",
                    Date = "12/20-21/2025",
                    Location = "Baton Rouge",
                    Website = "https://theatre.raisingcanesrivercenter.com/events-tickets/",
                    Latitude = 30.4449,
                    Longitude = -91.1879,
                    Description = "Southern adaptation of the classic ballet The Nutcracker, set in Louisiana",
                    Category = "Performance",
                    Popularity = 0.80,
                    Image = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_434,q_80,w_640/v1/crm/batonrouge/Screenshot-2024-10-21-135310_E43802D3-A04D-A92A-E7147A31F162CAD0_e445f398-bfc3-5fef-5e61faaff2aa8663.png"
                }, 
            };

            context.Events.AddRange(events);
            context.SaveChanges();
        }
    }
}
