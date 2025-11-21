import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tour {
    id: number;
    name: string;
    description: string;
    price: string;
    keywords: string[];
    image: string;
    url: string;
}

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tours.html',
  styleUrl: './tours.css'
})
export class ToursComponent{
  searchQuery: string = '';
  
  tours: Tour[] = [
    {
      id: 1,
      name: "New Orleans Ghost Adventures",
      description: "Get a haunted tour from New Orleans Ghost Adventures! Visit famous cemeteries and spooky locations all throughout the city of New Orleans. From bus tours to bar crawls, these tours will have you witnessing the true spirits of the city!",
      price: "32-59",
      keywords: ["bus tour", "haunted", "ghost", "cemetery", "bar crawl", "spirits", "voodoo", "spooky"],
      image: "assets/images/scarystreet.webp",
      url: "https://www.neworleansghostadventurestour.com/haunted-city-cemetery-tour/"
    },
    {
      id: 2,
      name: "Airboat Adventures",
      description: "Experience a fast, exciting airboat tour through some of the swamps of Louisiana! Get a guided tour of some of the state's ecosystem and learn all about nature. Get the chance to see alligators, nutria, and more!",
      price: "17-85",
      keywords: ["swamp", "air boat", "water", "bayou", "ride"],
      image: "assets/images/airboat.webp",
      url: "https://airboatadventures.com/airboat-tours/?msclkid=6c9c837f3f7d19c0df23ea6194e1cc74&utm_source=bing&utm_medium=cpc&utm_campaign=Nonbrand&utm_term=airboat%20tours%20new%20orleans&utm_content=Airboat%20Tours" 
    },
    {
      id: 3,
      name: "Mardi Gras World Tours",
      description: "Discover and learn about the history of Mardi Gras at Mardi Gras World! Take a tour to see many of the floats used in the parades during Mardi Gras. Find out how Mardi Gras started and some of the many parades that are driven through the city. You even receive a king cake slice to taste the true, authentice Mardi Gras dessert!",
      price: "24.95-29.95",
      keywords: ["mardi gras", "floats", "king cake", "history", "parade", "beads", "jester"],
      image: "assets/images/mardigrasworld.jpg",
      url: "https://www.mardigrasworld.com/" 
    },
    {
      id: 4,
      name: "New Orleans Carriage Tours",
      description: "Receive a carriage tour around the great city of New Orleans! Enjoy the sights and scenes from the comfort of a carriage. If there's any landmark you'd like to experience, this is the tour to take!",
      price: "60-150",
      keywords: ["carriage", "horses", "new orleans", "french quarter", "city", "sight seeing"],
      image: "assets/images/carriage.jpg",
      url: "https://www.neworleanscarriages.com/"
    },
    {
      id: 5,
      name: "Steamboat Natchez Cruise",
      description: "Get a cruise on the Mississippi River with the Steamboat Natchez Cruise! Choose one of the many offers whether it's a simple cruise or a cruise with food! Sit back and relax as the sounds and breeze of the Mississippi River pass by as you enjoy the view!",
      price: "43.50-80",
      keywords: ["steamboat", "river", "cruise", "dinner", "lunch", "morning", "evening", "eating"],
      image: "assets/images/steamboat.webp",
      url: "https://steamboat-natchez.new-orleans-tickets.com/?ci=1&cm=555472187_1300723480686885_c_o_steamboat%20new%20orleans_p_{extensionid}&msclkid=ccf22ae6bbf7125953bd43f808274f19&utm_source=bing&utm_medium=cpc&utm_campaign=New%20Orleans%20-%20Steamboat%20Natchez%20-%20Other%20Languages%20-%20USA%20-%20Search%20-%20All%20-%20All%20-%20cid6103&utm_term=steamboat%20new%20orleans&utm_content=Generic%20-%20Phrase%20-%20English%20-%20All" 
    },
    {
      id: 6,
      name: "Abita Beer Tour",
      description: "Have a guided tour through the Louisiana based brewery for Abita Beer! Walk through and see how the products are made. Get enriched in the history of the company and how they came to be as large as they are now. You even get a beer or a flight of six products depending on your package!",
      price: "10-18",
      keywords: ["Abita", "beer", "brewery", "alcohol", "21+", "tasting"],
      image: "assets/images/abita.webp",
      url: "https://abita.com/visit/tours/" 
    },
  ];

  get filteredTours(): Tour[] {
    if (!this.searchQuery.trim()) {
      return this.tours;
    }

    const searchTerm = this.searchQuery.toLowerCase().trim();
    
    return this.tours.filter(tour => {
      const nameMatch = tour.name.toLowerCase().includes(searchTerm);
      const descMatch = tour.description.toLowerCase().includes(searchTerm);
      const keywordMatch = tour.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      return nameMatch || descMatch || keywordMatch;
    });
  }
}
