import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateRecipeRequest, RecipeCategory, RecipeDifficulty, RecipeCategoryDisplayNames, RecipeDifficultyDisplayNames } from '../../../models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  categories = Object.entries(RecipeCategoryDisplayNames).map(([value, label]) => ({ value: value as RecipeCategory, label }));
  difficulties = Object.entries(RecipeDifficultyDisplayNames).map(([value, label]) => ({ value: value as RecipeDifficulty, label }));
  isSubmitting = false;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recipeForm = this.createForm();
  }

  ngOnInit(): void {
    // If editing an existing recipe, populate the form
    if (this.data?.recipe) {
      this.populateForm(this.data.recipe);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      cookTime: ['', Validators.required],
      prepTime: ['', Validators.required],
      servings: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
      ingredients: this.fb.array([this.createIngredientControl()], Validators.required),
      instructions: this.fb.array([this.createInstructionControl()], Validators.required),
      tags: [''] // We'll handle tags as a comma-separated string
    });
  }

  private createIngredientControl(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  private createInstructionControl(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Getters for form arrays
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  // Add/Remove ingredients
  addIngredient(): void {
    this.ingredients.push(this.createIngredientControl());
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  // Add/Remove instructions
  addInstruction(): void {
    this.instructions.push(this.createInstructionControl());
  }

  removeInstruction(index: number): void {
    if (this.instructions.length > 1) {
      this.instructions.removeAt(index);
    }
  }

  // File upload handling
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.cdr.detectChanges(); // Trigger change detection to update the view
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.recipeForm.get(fieldName);
    const isInvalid = !!(field && field.invalid && (field.dirty || field.touched));
    if (isInvalid) {
      console.log(`Field ${fieldName} is invalid:`, {
        value: field?.value,
        errors: field?.errors,
        dirty: field?.dirty,
        touched: field?.touched
      });
    }
    return isInvalid;
  }

  getFieldError(fieldName: string): string {
    const field = this.recipeForm.get(fieldName);
    if (field?.errors) {
      console.log(`Errors for ${fieldName}:`, field.errors);
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `${fieldName} cannot exceed ${field.errors['maxlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} must be at least ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} cannot exceed ${field.errors['max'].max}`;
      return `${fieldName} is invalid: ${JSON.stringify(field.errors)}`;
    }
    return '';
  }

  // Submit form
  onSubmit(): void {
    // Log form validation status
    console.log('Form validation status:', {
      formValid: this.recipeForm.valid,
      formErrors: this.recipeForm.errors,
      controls: {
        title: { valid: this.recipeForm.get('title')?.valid, errors: this.recipeForm.get('title')?.errors },
        description: { valid: this.recipeForm.get('description')?.valid, errors: this.recipeForm.get('description')?.errors },
        category: { valid: this.recipeForm.get('category')?.valid, errors: this.recipeForm.get('category')?.errors },
        difficulty: { valid: this.recipeForm.get('difficulty')?.valid, errors: this.recipeForm.get('difficulty')?.errors },
        cookTime: { valid: this.recipeForm.get('cookTime')?.valid, errors: this.recipeForm.get('cookTime')?.errors },
        prepTime: { valid: this.recipeForm.get('prepTime')?.valid, errors: this.recipeForm.get('prepTime')?.errors },
        servings: { valid: this.recipeForm.get('servings')?.valid, errors: this.recipeForm.get('servings')?.errors },
        ingredients: { valid: this.recipeForm.get('ingredients')?.valid, errors: this.recipeForm.get('ingredients')?.errors },
        instructions: { valid: this.recipeForm.get('instructions')?.valid, errors: this.recipeForm.get('instructions')?.errors }
      }
    });

    if (this.recipeForm.valid) {
      this.isSubmitting = true;
      const formValue = this.recipeForm.value;
      
      // Process ingredients and instructions
      const ingredients = formValue.ingredients.map((ing: any) => ing.text).filter((text: string) => text.trim());
      const instructions = formValue.instructions.map((inst: any) => inst.text).filter((text: string) => text.trim());
      
      // Process tags
      const tags = formValue.tags ? 
        formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : 
        [];

      const recipeData: CreateRecipeRequest = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        difficulty: formValue.difficulty,
        cookTime: formValue.cookTime,
        prepTime: formValue.prepTime,
        servings: formValue.servings,
        ingredients,
        instructions,
        tags,
        image: this.imagePreview || undefined
      };

      this.dialogRef.close({
        recipe: recipeData,
        file: this.selectedFile
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.recipeForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          } else {
            c.markAsTouched();
          }
        });
      }
    });
  }

  private populateForm(recipe: any): void {
    // If editing, populate form with existing data
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      difficulty: recipe.difficulty,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      tags: recipe.tags?.join(', ') || ''
    });

    // Populate ingredients
    this.ingredients.clear();
    recipe.ingredients?.forEach((ingredient: string) => {
      const control = this.createIngredientControl();
      control.patchValue({ text: ingredient });
      this.ingredients.push(control);
    });

    // Populate instructions
    this.instructions.clear();
    recipe.instructions?.forEach((instruction: string) => {
      const control = this.createInstructionControl();
      control.patchValue({ text: instruction });
      this.instructions.push(control);
    });

    if (recipe.image) {
      this.imagePreview = recipe.image;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}