import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RecipesComponent {
  recipes = [
    {
      id: 1,
      title: 'Gumbo',
      author: 'Chef Marie',
      description: 'Traditional Louisiana gumbo with okra and seafood',
      image: 'assets/images/gumbo.jpg',
      category: 'Main Course',
      difficulty: 'Medium',
      cookTime: '2 hours',
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: 'Jambalaya',
      author: 'Cajun Cook',
      description: 'Spicy rice dish with chicken, sausage, and shrimp',
      image: 'assets/images/jambalaya.jpg',
      category: 'Main Course',
      difficulty: 'Easy',
      cookTime: '45 minutes',
      likes: 32,
      comments: 8
    },
    {
      id: 3,
      title: 'Beignets',
      author: 'Cafe Master',
      description: 'Classic New Orleans powdered sugar donuts',
      image: 'assets/images/beignets.jpg',
      category: 'Dessert',
      difficulty: 'Medium',
      cookTime: '1 hour',
      likes: 67,
      comments: 23
    },
    {
      id: 4,
      title: 'Red Beans and Rice',
      author: 'Home Cook',
      description: 'Monday tradition with kidney beans and andouille',
      image: 'assets/images/redbeans.jpg',
      category: 'Main Course',
      difficulty: 'Easy',
      cookTime: '3 hours',
      likes: 28,
      comments: 15
    }
  ];

  categories = ['All', 'Main Course', 'Appetizer', 'Dessert', 'Beverage'];
  selectedCategory = 'All';

  constructor() {}

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  getFilteredRecipes() {
    if (this.selectedCategory === 'All') {
      return this.recipes;
    }
    return this.recipes.filter(recipe => recipe.category === this.selectedCategory);
  }

  likeRecipe(recipe: any) {
    recipe.likes++;
  }
}