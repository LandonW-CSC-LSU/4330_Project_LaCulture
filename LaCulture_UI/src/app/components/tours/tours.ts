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
      keywords: ["bus tour", "haunted", "ghost", "cemetery", "bar crawl", "spirits", "voodoo"],
      image: "assets/images/scarystreet.webp",
      url: "https://www.neworleansghostadventurestour.com/haunted-city-cemetery-tour/"
    },
    {
      id: 2,
      name: "Garden District Mansion Tour",
      description: "Stroll through one of America's most beautiful neighborhoods featuring stunning antebellum mansions, lush gardens, and oak-lined streets. Learn about the wealthy history of uptown New Orleans.",
      price: "32-59",
      keywords: ["garden district", "mansions", "architecture", "gardens", "uptown", "historic homes"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour" 
    },
    {
      id: 3,
      name: "Cemetery & Voodoo Tour",
      description: "Discover the mystical side of New Orleans with visits to above-ground cemeteries and voodoo history. Learn about Marie Laveau and the unique burial traditions of the Crescent City.",
      price: "60",
      keywords: ["cemetery", "voodoo", "marie laveau", "spirits", "mystical", "supernatural", "burial"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour" 
    },
    {
      id: 4,
      name: "Jazz & Music Heritage Tour",
      description: "Walk in the footsteps of jazz legends through the birthplace of America's greatest art form. Visit historic music venues, Congo Square, and learn about Louis Armstrong and other jazz pioneers.",
      price: "50",
      keywords: ["jazz", "music", "louis armstrong", "congo square", "heritage", "brass band"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour"
    },
    {
      id: 5,
      name: "Creole Cuisine Food Tour",
      description: "Taste your way through New Orleans with stops at legendary restaurants and hidden gems. Sample gumbo, beignets, po'boys, and other Creole classics while learning culinary history.",
      price: "85",
      keywords: ["food", "cuisine", "gumbo", "beignets", "restaurants", "creole", "cajun", "eating"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour" 
    },
    {
      id: 6,
      name: "Swamp & Bayou Adventure",
      description: "Journey into Louisiana's mysterious swamplands on an airboat tour. See alligators, exotic birds, and cypress trees while learning about Cajun culture and wetland ecosystems.",
      price: "95",
      keywords: ["swamp", "bayou", "airboat", "alligator", "nature", "wildlife", "cajun", "wetlands"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour" 
    },
    {
      id: 7,
      name: "Ghost & Haunted History Tour",
      description: "Experience the supernatural side of the most haunted city in America. Visit locations of famous hauntings, hear chilling tales, and explore the dark history of New Orleans after sunset.",
      price: "40",
      keywords: ["ghost", "haunted", "supernatural", "spooky", "paranormal", "night", "scary"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour" 
    },
    {
      id: 8,
      name: "Steamboat River Cruise",
      description: "Relax on an authentic paddlewheel steamboat cruising the mighty Mississippi River. Enjoy live jazz music, Creole cuisine, and stunning views of the New Orleans skyline.",
      price: "75",
      keywords: ["river", "steamboat", "cruise", "mississippi", "boat", "paddlewheel", "jazz cruise"],
      image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=500&fit=crop",
      url: "https://example.com/french-quarter-tour" 
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
