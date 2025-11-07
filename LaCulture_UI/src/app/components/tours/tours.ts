import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tour {
    id: number;
    name: string;
    description: string;
    price: number;
    keywords: string[];
}

@Component({
  selector: 'app-tours',
  imports: [CommonModule, FormsModule],
  templateUrl: './tours.html',
  styleUrl: './tours.css'
})
export class ToursComponent{
searchQuery: string = '';
  
  tours: Tour[] = [
    {
      id: 1,
      name: "French Quarter Walking Tour",
      description: "Explore the historic heart of New Orleans with cobblestone streets, wrought-iron balconies, and centuries of fascinating stories. Visit Jackson Square, St. Louis Cathedral, and hidden courtyards.",
      price: 45,
      keywords: ["french quarter", "walking", "historic", "architecture", "jackson square", "cathedral"]
    },
    {
      id: 2,
      name: "Garden District Mansion Tour",
      description: "Stroll through one of America's most beautiful neighborhoods featuring stunning antebellum mansions, lush gardens, and oak-lined streets. Learn about the wealthy history of uptown New Orleans.",
      price: 55,
      keywords: ["garden district", "mansions", "architecture", "gardens", "uptown", "historic homes"]
    },
    {
      id: 3,
      name: "Cemetery & Voodoo Tour",
      description: "Discover the mystical side of New Orleans with visits to above-ground cemeteries and voodoo history. Learn about Marie Laveau and the unique burial traditions of the Crescent City.",
      price: 60,
      keywords: ["cemetery", "voodoo", "marie laveau", "spirits", "mystical", "supernatural", "burial"]
    },
    {
      id: 4,
      name: "Jazz & Music Heritage Tour",
      description: "Walk in the footsteps of jazz legends through the birthplace of America's greatest art form. Visit historic music venues, Congo Square, and learn about Louis Armstrong and other jazz pioneers.",
      price: 50,
      keywords: ["jazz", "music", "louis armstrong", "congo square", "heritage", "brass band"]
    },
    {
      id: 5,
      name: "Creole Cuisine Food Tour",
      description: "Taste your way through New Orleans with stops at legendary restaurants and hidden gems. Sample gumbo, beignets, po'boys, and other Creole classics while learning culinary history.",
      price: 85,
      keywords: ["food", "cuisine", "gumbo", "beignets", "restaurants", "creole", "cajun", "eating"]
    },
    {
      id: 6,
      name: "Swamp & Bayou Adventure",
      description: "Journey into Louisiana's mysterious swamplands on an airboat tour. See alligators, exotic birds, and cypress trees while learning about Cajun culture and wetland ecosystems.",
      price: 95,
      keywords: ["swamp", "bayou", "airboat", "alligator", "nature", "wildlife", "cajun", "wetlands"]
    },
    {
      id: 7,
      name: "Ghost & Haunted History Tour",
      description: "Experience the supernatural side of the most haunted city in America. Visit locations of famous hauntings, hear chilling tales, and explore the dark history of New Orleans after sunset.",
      price: 40,
      keywords: ["ghost", "haunted", "supernatural", "spooky", "paranormal", "night", "scary"]
    },
    {
      id: 8,
      name: "Steamboat River Cruise",
      description: "Relax on an authentic paddlewheel steamboat cruising the mighty Mississippi River. Enjoy live jazz music, Creole cuisine, and stunning views of the New Orleans skyline.",
      price: 75,
      keywords: ["river", "steamboat", "cruise", "mississippi", "boat", "paddlewheel", "jazz cruise"]
    },
    {
      id: 9,
      name: "Mardi Gras World Tour",
      description: "Go behind the scenes at the famous float-building warehouse where Mardi Gras magic is created year-round. Try on costumes, see massive floats, and learn about carnival traditions.",
      price: 35,
      keywords: ["mardi gras", "carnival", "floats", "parade", "costumes", "krewe", "beads"]
    },
    {
      id: 10,
      name: "Cocktail & Bar History Tour",
      description: "Sip your way through New Orleans cocktail culture visiting historic bars where classics like the Sazerac and Hurricane were invented. Learn mixology secrets and prohibition history.",
      price: 70,
      keywords: ["cocktails", "bars", "drinks", "sazerac", "hurricane", "bourbon street", "nightlife"]
    },
    {
      id: 11,
      name: "Civil Rights & African American Heritage Tour",
      description: "Explore the profound contributions of African Americans to New Orleans culture. Visit significant civil rights landmarks, historic neighborhoods, and learn about struggle and triumph.",
      price: 50,
      keywords: ["civil rights", "african american", "heritage", "history", "culture", "treme", "museum"]
    },
    {
      id: 12,
      name: "Plantation Country Tour",
      description: "Visit magnificent antebellum plantations along the Great River Road. Tour historic homes, beautiful grounds, and learn about both the grandeur and the difficult truths of plantation history.",
      price: 110,
      keywords: ["plantation", "antebellum", "historic homes", "oak alley", "river road", "history"]
    }
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
