export interface Recipe {
  id: number;
  title: string;
  author: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  cookTime: string;
  prepTime: string;
  servings: number;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // For tracking who created the recipe
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  cookTime: string;
  prepTime: string;
  servings: number;
  tags: string[];
}

export interface UpdateRecipeRequest extends Partial<CreateRecipeRequest> {
  id: number;
}

export enum RecipeCategory {
  MainCourse = 'MainCourse',
  Appetizer = 'Appetizer',
  Dessert = 'Dessert',
  Beverage = 'Beverage',
  SideDish = 'SideDish',
  Snack = 'Snack'
}

export enum RecipeDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

// Display name mappings
export const RecipeCategoryDisplayNames: Record<RecipeCategory, string> = {
  [RecipeCategory.MainCourse]: 'Main Course',
  [RecipeCategory.Appetizer]: 'Appetizer',
  [RecipeCategory.Dessert]: 'Dessert',
  [RecipeCategory.Beverage]: 'Beverage',
  [RecipeCategory.SideDish]: 'Side Dish',
  [RecipeCategory.Snack]: 'Snack'
};

export const RecipeDifficultyDisplayNames: Record<RecipeDifficulty, string> = {
  [RecipeDifficulty.Easy]: 'Easy',
  [RecipeDifficulty.Medium]: 'Medium',
  [RecipeDifficulty.Hard]: 'Hard'
};

export interface RecipeComment {
  id: number;
  recipeId: number;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface RecipeFilters {
  category?: RecipeCategory;
  difficulty?: RecipeDifficulty;
  searchTerm?: string;
  tags?: string[];
}