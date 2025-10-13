import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddRecipeComponent } from '../components/add-recipe/add-recipe.component';
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

  openEditRecipeDialog(recipe: Recipe): Observable<AddRecipeDialogResult | undefined> {
    return this.openAddRecipeDialog({
      recipe,
      mode: 'edit'
    });
  }
}