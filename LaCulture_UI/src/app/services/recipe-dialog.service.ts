import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddRecipeComponent } from '../components/recipes/add-recipe/add-recipe.component';
import { ViewRecipeComponent } from '../components/recipes/view-recipe/view-recipe.component';
import { Recipe, CreateRecipeRequest } from '../models/recipe.model';

export interface AddRecipeDialogData {
  recipe?: Recipe; // For editing existing recipes
  mode?: 'add' | 'edit';
}

export interface AddRecipeDialogResult {
  recipe: CreateRecipeRequest;
  file?: File;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeDialogService {

  constructor(private dialog: MatDialog) {}

  openAddRecipeDialog(data?: AddRecipeDialogData): Observable<AddRecipeDialogResult | undefined> {
    const dialogRef: MatDialogRef<AddRecipeComponent, AddRecipeDialogResult> = this.dialog.open(
      AddRecipeComponent, 
      {
        width: '800px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        data: data || { mode: 'add' },
        disableClose: true, // Prevent accidental closes
        autoFocus: true,
        restoreFocus: true
      }
    );

    return dialogRef.afterClosed();
  }

  openViewRecipeDialog(recipe: Recipe): Observable<void> {
    const dialogRef = this.dialog.open(ViewRecipeComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'view-recipe-panel',
      autoFocus: false,
      data: { recipe }
    });

    return dialogRef.afterClosed();
  }

  openEditRecipeDialog(recipe: Recipe): Observable<AddRecipeDialogResult | undefined> {
    return this.openAddRecipeDialog({
      recipe,
      mode: 'edit'
    });
  }
}