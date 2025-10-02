using LaCulture.API.Data;
using LaCulture.API.DTOs;
using LaCulture.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LaCulture.API.Services
{
    public class DbRecipeService : IRecipeService
    {
        private readonly AppDbContext _context;

        public DbRecipeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Recipe>> GetAllRecipesAsync(RecipeFiltersDto? filters = null)
        {
            var query = _context.Recipes.AsQueryable();

            if (filters != null)
            {
                if (!string.IsNullOrEmpty(filters.Search))
                {
                    var searchTerm = filters.Search.ToLower();
                    query = query.Where(r => 
                        r.Title.ToLower().Contains(searchTerm) ||
                        r.Description.ToLower().Contains(searchTerm) ||
                        r.Author.ToLower().Contains(searchTerm) ||
                        r.Tags.Any(t => t.ToLower().Contains(searchTerm)));
                }

                if (filters.Category.HasValue)
                {
                    query = query.Where(r => r.Category == filters.Category);
                }

                if (filters.Difficulty.HasValue)
                {
                    query = query.Where(r => r.Difficulty == filters.Difficulty);
                }

                if (filters.Tags != null && filters.Tags.Any())
                {
                    query = query.Where(r => 
                        filters.Tags.Any(filterTag => 
                            r.Tags.Any(recipeTag => 
                                recipeTag.ToLower().Contains(filterTag.ToLower()))));
                }
            }

            return await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
        }

        public async Task<Recipe?> GetRecipeByIdAsync(int id)
        {
            return await _context.Recipes.FindAsync(id);
        }

        public async Task<Recipe> CreateRecipeAsync(CreateRecipeDto recipeDto, string userId)
        {
            var recipe = new Recipe
            {
                Title = recipeDto.Title,
                Description = recipeDto.Description,
                Author = string.IsNullOrEmpty(userId) ? "Anonymous Chef" : userId,
                Ingredients = recipeDto.Ingredients,
                Instructions = recipeDto.Instructions,
                Image = recipeDto.Image,
                Category = recipeDto.Category,
                Difficulty = recipeDto.Difficulty,
                CookTime = recipeDto.CookTime,
                PrepTime = recipeDto.PrepTime,
                Servings = recipeDto.Servings,
                Tags = recipeDto.Tags,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                UserId = userId,
                Likes = 0,
                Comments = 0
            };

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return recipe;
        }

        public async Task<Recipe?> UpdateRecipeAsync(int id, UpdateRecipeDto recipeDto)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                throw new ArgumentException($"Recipe with ID {id} not found.");

            // Update only the properties that are provided
            if (recipeDto.Title != null)
                recipe.Title = recipeDto.Title;
            if (recipeDto.Description != null)
                recipe.Description = recipeDto.Description;
            if (recipeDto.Ingredients != null)
                recipe.Ingredients = recipeDto.Ingredients;
            if (recipeDto.Instructions != null)
                recipe.Instructions = recipeDto.Instructions;
            if (recipeDto.Image != null)
                recipe.Image = recipeDto.Image;
            if (recipeDto.Category.HasValue)
                recipe.Category = recipeDto.Category.Value;
            if (recipeDto.Difficulty.HasValue)
                recipe.Difficulty = recipeDto.Difficulty.Value;
            if (recipeDto.CookTime != null)
                recipe.CookTime = recipeDto.CookTime;
            if (recipeDto.PrepTime != null)
                recipe.PrepTime = recipeDto.PrepTime;
            if (recipeDto.Servings.HasValue)
                recipe.Servings = recipeDto.Servings.Value;
            if (recipeDto.Tags != null)
                recipe.Tags = recipeDto.Tags;

            recipe.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return recipe;
        }

        public async Task<bool> DeleteRecipeAsync(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                return false;

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Recipe?> ToggleLikeAsync(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                return null;

            recipe.Likes += 1;
            recipe.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return recipe;
        }
    }
}