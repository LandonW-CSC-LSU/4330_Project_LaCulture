import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { 
  Recipe, 
  CreateRecipeRequest, 
  UpdateRecipeRequest, 
  RecipeFilters,
  RecipeComment,
  RecipeCategory,
  RecipeDifficulty 
} from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:5189/api/recipes';
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  public recipes$ = this.recipesSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.loadRecipes();
  }

  // Get all recipes
  getRecipes(filters?: RecipeFilters): Observable<Recipe[]> {
    let url = this.apiUrl;
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.searchTerm) params.append('search', filters.searchTerm);
      if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach(tag => params.append('tags', tag));
      }
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return this.http.get<Recipe[]>(url).pipe(
      tap(recipes => this.recipesSubject.next(recipes)),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  // Get recipe by ID
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  // Create new recipe
  createRecipe(recipe: CreateRecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe, this.httpOptions).pipe(
      tap(newRecipe => {
        const currentRecipes = this.recipesSubject.value;
        this.recipesSubject.next([...currentRecipes, newRecipe]);
      }),
      catchError(this.handleError<Recipe>('createRecipe'))
    );
  }

  // Update recipe
  updateRecipe(recipe: UpdateRecipeRequest): Observable<Recipe> {
    const url = `${this.apiUrl}/${recipe.id}`;
    return this.http.put<Recipe>(url, recipe, this.httpOptions).pipe(
      tap(updatedRecipe => {
        const currentRecipes = this.recipesSubject.value;
        const index = currentRecipes.findIndex(r => r.id === updatedRecipe.id);
        if (index !== -1) {
          currentRecipes[index] = updatedRecipe;
          this.recipesSubject.next([...currentRecipes]);
        }
      }),
      catchError(this.handleError<Recipe>('updateRecipe'))
    );
  }

  // Delete recipe
  deleteRecipe(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(() => {
        const currentRecipes = this.recipesSubject.value;
        const filteredRecipes = currentRecipes.filter(r => r.id !== id);
        this.recipesSubject.next(filteredRecipes);
      }),
      catchError(this.handleError('deleteRecipe'))
    );
  }

  // Like/Unlike recipe
  toggleLike(id: number): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}/like`;
    return this.http.post<Recipe>(url, {}, this.httpOptions).pipe(
      tap(updatedRecipe => {
        const currentRecipes = this.recipesSubject.value;
        const index = currentRecipes.findIndex(r => r.id === updatedRecipe.id);
        if (index !== -1) {
          currentRecipes[index] = updatedRecipe;
          this.recipesSubject.next([...currentRecipes]);
        }
      }),
      catchError(this.handleError<Recipe>('toggleLike'))
    );
  }

  // Get recipe comments
  getRecipeComments(recipeId: number): Observable<RecipeComment[]> {
    const url = `${this.apiUrl}/${recipeId}/comments`;
    return this.http.get<RecipeComment[]>(url).pipe(
      catchError(this.handleError<RecipeComment[]>('getRecipeComments', []))
    );
  }

  // Add comment to recipe
  addComment(recipeId: number, content: string): Observable<RecipeComment> {
    const url = `${this.apiUrl}/${recipeId}/comments`;
    return this.http.post<RecipeComment>(url, { content }, this.httpOptions).pipe(
      catchError(this.handleError<RecipeComment>('addComment'))
    );
  }

  // Upload recipe image
  uploadImage(file: File): Observable<{imageUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<{imageUrl: string}>(`${this.apiUrl}/upload-image`, formData).pipe(
      catchError(this.handleError<{imageUrl: string}>('uploadImage'))
    );
  }

  // Load initial recipes (fallback for offline/demo data)
  private loadRecipes(): void {
    // Try to load from API first, fallback to mock data
    this.getRecipes().subscribe({
      error: () => {
        // If API fails, use mock data
        this.recipesSubject.next(this.getMockRecipes());
      }
    });
  }

  // Mock data for development/demo
  private getMockRecipes(): Recipe[] {
    return [
      {
        id: 1,
        title: 'Gumbo',
        author: 'Chef Marie',
        description: 'Traditional Louisiana gumbo with okra and seafood',
        ingredients: [
          '1/2 cup vegetable oil',
          '1/2 cup all-purpose flour',
          '1 large onion, diced',
          '1 bell pepper, diced',
          '2 celery stalks, diced',
          '1 lb okra, sliced',
          '1 lb shrimp, peeled',
          '1 lb crab meat',
          '8 cups seafood stock',
          'Salt, pepper, and Cajun seasoning to taste'
        ],
        instructions: [
          'Make a dark roux with oil and flour',
          'Add the holy trinity (onion, bell pepper, celery)',
          'Add okra and cook until tender',
          'Add stock gradually, stirring constantly',
          'Simmer for 1 hour',
          'Add seafood in final 10 minutes',
          'Season to taste and serve over rice'
        ],
        image: 'assets/images/gumbo.jpg',
        category: RecipeCategory.MainCourse,
        difficulty: RecipeDifficulty.Medium,
        cookTime: '2 hours',
        prepTime: '30 minutes',
        servings: 8,
        likes: 45,
        comments: 12,
        tags: ['seafood', 'traditional', 'spicy'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 2,
        title: 'Jambalaya',
        author: 'Cajun Cook',
        description: 'Spicy rice dish with chicken, sausage, and shrimp',
        ingredients: [
          '2 cups long-grain white rice',
          '1 lb chicken thighs, diced',
          '1 lb andouille sausage, sliced',
          '1 lb shrimp, peeled',
          '1 onion, diced',
          '1 bell pepper, diced',
          '2 celery stalks, diced',
          '3 cups chicken stock',
          'Cajun seasoning to taste'
        ],
        instructions: [
          'Brown the chicken and sausage in a large pot',
          'Add the holy trinity and cook until soft',
          'Add rice and stir to coat',
          'Add stock and seasonings',
          'Bring to a boil, then simmer covered for 18 minutes',
          'Add shrimp in final 5 minutes',
          'Let rest 5 minutes before serving'
        ],
        image: 'assets/images/jambalaya.jpg',
        category: RecipeCategory.MainCourse,
        difficulty: RecipeDifficulty.Easy,
        cookTime: '45 minutes',
        prepTime: '20 minutes',
        servings: 6,
        likes: 32,
        comments: 8,
        tags: ['rice', 'one-pot', 'spicy'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: 3,
        title: 'Beignets',
        author: 'Cafe Master',
        description: 'Classic New Orleans powdered sugar donuts',
        ingredients: [
          '1 package active dry yeast',
          '1/4 cup warm water',
          '1/4 cup sugar',
          '1/2 cup milk',
          '1/4 cup butter',
          '1 egg',
          '3 cups all-purpose flour',
          '1/2 tsp salt',
          'Oil for frying',
          'Powdered sugar for dusting'
        ],
        instructions: [
          'Dissolve yeast in warm water with a pinch of sugar',
          'Heat milk and butter until butter melts',
          'Mix flour, sugar, and salt in a large bowl',
          'Add yeast mixture, milk mixture, and egg',
          'Knead until smooth, then let rise for 1 hour',
          'Roll out and cut into squares',
          'Fry in hot oil until golden brown',
          'Dust heavily with powdered sugar'
        ],
        image: 'assets/images/beignets.jpg',
        category: RecipeCategory.Dessert,
        difficulty: RecipeDifficulty.Medium,
        cookTime: '20 minutes',
        prepTime: '1 hour 30 minutes',
        servings: 12,
        likes: 67,
        comments: 23,
        tags: ['sweet', 'fried', 'breakfast'],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: 4,
        title: 'Red Beans and Rice',
        author: 'Home Cook',
        description: 'Monday tradition with kidney beans and andouille',
        ingredients: [
          '1 lb dried red kidney beans',
          '1 lb andouille sausage, sliced',
          '1 ham bone or ham hock',
          '1 onion, diced',
          '1 bell pepper, diced',
          '2 celery stalks, diced',
          '3 cloves garlic, minced',
          '2 bay leaves',
          'Cajun seasoning to taste',
          'Cooked white rice for serving'
        ],
        instructions: [
          'Soak beans overnight in water',
          'Brown the sausage in a large pot',
          'Add the holy trinity and garlic, cook until soft',
          'Add beans, ham bone, and enough water to cover',
          'Add bay leaves and seasonings',
          'Simmer for 2-3 hours until beans are tender',
          'Mash some beans to thicken',
          'Serve over rice'
        ],
        image: 'assets/images/redbeans.jpg',
        category: RecipeCategory.MainCourse,
        difficulty: RecipeDifficulty.Easy,
        cookTime: '3 hours',
        prepTime: '15 minutes',
        servings: 8,
        likes: 28,
        comments: 15,
        tags: ['beans', 'comfort-food', 'traditional'],
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        id: 5,
        title: 'Iced Coffee',
        author: 'Barista Bob',
        description: 'Refreshing cold brew coffee',
        ingredients: [
          '1 cup ground coffee',
          '4 cups cold water',
          'Ice cubes',
          'Milk or cream (optional)',
          'Sugar or sweetener (optional)'
        ],
        instructions: [
          'Combine coffee and cold water',
          'Steep for 12-24 hours',
          'Strain through fine mesh',
          'Serve over ice',
          'Add milk and sweetener to taste'
        ],
        image: 'assets/images/coffee.jpg',
        category: RecipeCategory.Beverage,
        difficulty: RecipeDifficulty.Easy,
        cookTime: '5 minutes',
        prepTime: '12 hours',
        servings: 4,
        likes: 15,
        comments: 3,
        tags: ['coffee', 'cold', 'refreshing'],
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      }
    ];
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // Let the app keep running by returning an empty result
      return throwError(() => error);
    };
  }
}