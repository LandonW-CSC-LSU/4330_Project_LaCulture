import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe, RecipeFilters, RecipeCategory, RecipeDifficulty } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  filters: RecipeFilters;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  filters: {},
  loading: false,
  error: null
};

@Injectable({
  providedIn: 'root'
})
export class RecipeStateService {
  private stateSubject = new BehaviorSubject<RecipeState>(initialState);
  public state$ = this.stateSubject.asObservable();

  // Selectors
  public recipes$ = this.state$.pipe(map(state => state.recipes));
  public selectedRecipe$ = this.state$.pipe(map(state => state.selectedRecipe));
  public filters$ = this.state$.pipe(map(state => state.filters));
  public loading$ = this.state$.pipe(map(state => state.loading));
  public error$ = this.state$.pipe(map(state => state.error));

  // Filtered recipes based on current filters
  public filteredRecipes$ = combineLatest([this.recipes$, this.filters$]).pipe(
    map(([recipes, filters]) => this.applyFilters(recipes, filters))
  );

  constructor(private recipeService: RecipeService) {
    // Removed automatic subscription to avoid duplicates
    // State is now managed exclusively through action methods
  }

  // Actions
  loadRecipes(filters?: RecipeFilters): void {
    this.setLoading(true);
    this.setError(null);
    
    this.recipeService.getRecipes(filters).subscribe({
      next: (recipes) => {
        this.updateState({ 
          recipes, 
          loading: false,
          filters: filters || {}
        });
      },
      error: (error) => {
        this.setError('Failed to load recipes');
        this.setLoading(false);
      }
    });
  }

  addRecipe(recipe: any): Observable<Recipe> {
    this.setLoading(true);
    this.setError(null);
    
    return new Observable(observer => {
      this.recipeService.createRecipe(recipe).subscribe({
        next: (newRecipe) => {
          const currentState = this.stateSubject.value;
          this.updateState({ 
            recipes: [...currentState.recipes, newRecipe],
            loading: false 
          });
          observer.next(newRecipe);
          observer.complete();
        },
        error: (error) => {
          this.setError('Failed to add recipe');
          this.setLoading(false);
          observer.error(error);
        }
      });
    });
  }

  updateRecipe(recipe: any): Observable<Recipe> {
    this.setLoading(true);
    this.setError(null);
    
    return new Observable(observer => {
      this.recipeService.updateRecipe(recipe).subscribe({
        next: (updatedRecipe) => {
          const currentState = this.stateSubject.value;
          const updatedRecipes = currentState.recipes.map(r => 
            r.id === updatedRecipe.id ? updatedRecipe : r
          );
          this.updateState({ 
            recipes: updatedRecipes,
            loading: false 
          });
          observer.next(updatedRecipe);
          observer.complete();
        },
        error: (error) => {
          this.setError('Failed to update recipe');
          this.setLoading(false);
          observer.error(error);
        }
      });
    });
  }

  deleteRecipe(id: number): void {
    this.setLoading(true);
    this.setError(null);
    
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        const currentState = this.stateSubject.value;
        const filteredRecipes = currentState.recipes.filter(r => r.id !== id);
        this.updateState({ 
          recipes: filteredRecipes,
          loading: false 
        });
      },
      error: (error) => {
        this.setError('Failed to delete recipe');
        this.setLoading(false);
      }
    });
  }

  selectRecipe(recipe: Recipe | null): void {
    this.updateState({ selectedRecipe: recipe });
  }

  setFilters(filters: RecipeFilters): void {
    this.updateState({ filters });
    this.loadRecipes(filters);
  }

  clearFilters(): void {
    this.updateState({ filters: {} });
    this.loadRecipes();
  }

  likeRecipe(id: number): void {
    this.recipeService.toggleLike(id).subscribe({
      next: (updatedRecipe) => {
        const currentState = this.stateSubject.value;
        const updatedRecipes = currentState.recipes.map(r => 
          r.id === updatedRecipe.id ? updatedRecipe : r
        );
        this.updateState({ recipes: updatedRecipes });
      },
      error: (error) => {
        this.setError('Failed to like recipe');
      }
    });
  }

  // Private methods
  private updateState(partialState: Partial<RecipeState>): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, ...partialState };
    this.stateSubject.next(newState);
  }

  private setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  private setError(error: string | null): void {
    this.updateState({ error });
  }

  private applyFilters(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
    let filtered = [...recipes];

    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.author.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(recipe => 
        filters.tags!.some(tag => recipe.tags.includes(tag))
      );
    }

    return filtered;
  }
}