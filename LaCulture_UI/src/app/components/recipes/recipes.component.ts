import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Recipe, RecipeCategory, RecipeCategoryDisplayNames, RecipeDifficulty, RecipeDifficultyDisplayNames } from '../../models/recipe.model';
import { RecipeStateService } from '../../store/recipe-state.service';
import { RecipeDialogService } from '../../services/recipe-dialog.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class RecipesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Observables from state service
  recipes$: Observable<Recipe[]>;
  filteredRecipes$: Observable<Recipe[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  categories = ['All', ...Object.values(RecipeCategoryDisplayNames)];
  selectedCategory = 'All';

  constructor(
    private recipeStateService: RecipeStateService,
    private recipeDialogService: RecipeDialogService,
    private snackBar: MatSnackBar
  ) {
    this.recipes$ = this.recipeStateService.recipes$;
    this.filteredRecipes$ = this.recipeStateService.filteredRecipes$;
    this.loading$ = this.recipeStateService.loading$;
    this.error$ = this.recipeStateService.error$;
  }

  viewRecipe(recipe: Recipe): void {
    // Open the read-only dialog via the dialog service
    this.recipeDialogService.openViewRecipeDialog(recipe).subscribe();
  }

  ngOnInit(): void {
    // Load initial recipes
    this.recipeStateService.loadRecipes();
    
    // Subscribe to errors and show snackbar notifications
    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        this.snackBar.open(error, 'Close', { duration: 5000 });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'All') {
      this.recipeStateService.setFilters({});
    } else {
      // Find the enum value that matches the display name
      const enumValue = Object.entries(RecipeCategoryDisplayNames)
        .find(([_, displayName]) => displayName === category)?.[0] as RecipeCategory;
      
      if (enumValue) {
        this.recipeStateService.setFilters({ category: enumValue });
      }
    }
  }

  likeRecipe(recipe: Recipe): void {
    this.recipeStateService.likeRecipe(recipe.id);
  }

  addNewRecipe(): void {
    this.recipeDialogService.openAddRecipeDialog().subscribe(result => {
      if (result) {
        this.recipeStateService.addRecipe(result.recipe).subscribe({
          next: (newRecipe) => {
            this.snackBar.open('Recipe added successfully!', 'Close', { 
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          },
          error: (error) => {
            this.snackBar.open('Failed to add recipe. Please try again.', 'Close', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  editRecipe(recipe: Recipe): void {
    this.recipeDialogService.openEditRecipeDialog(recipe).subscribe(result => {
      if (result) {
        const updateData = { ...result.recipe, id: recipe.id };
        this.recipeStateService.updateRecipe(updateData).subscribe({
          next: (updatedRecipe) => {
            this.snackBar.open('Recipe updated successfully!', 'Close', { 
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          },
          error: (error) => {
            this.snackBar.open('Failed to update recipe. Please try again.', 'Close', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  deleteRecipe(recipe: Recipe): void {
    if (confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      this.recipeStateService.deleteRecipe(recipe.id);
      this.snackBar.open('Recipe deleted successfully!', 'Close', { 
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }

  // TrackBy function for performance optimization
  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }

  // Helper method to get display names for enums
  getDisplayName(type: 'category' | 'difficulty', value: RecipeCategory | RecipeDifficulty): string {
    if (type === 'category') {
      return RecipeCategoryDisplayNames[value as RecipeCategory] || value as string;
    } else {
      return RecipeDifficultyDisplayNames[value as RecipeDifficulty] || value as string;
    }
  }
}