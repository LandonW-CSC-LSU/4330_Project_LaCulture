using Microsoft.AspNetCore.Mvc;
using LaCulture.API.Services;
using LaCulture.API.DTOs;
using LaCulture.API.Models;

namespace LaCulture.API.Controllers
{
    [ApiController]
    [Route("home")]
    public class HomeController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public HomeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet]
        public IActionResult GetHome()
        {
            return Ok(new { message = "Welcome to the LaCulture API homepage!" });
        }

        [HttpPost("test")]
        public async Task<IActionResult> TestDatabase()
        {
            try
            {
                // Create a test recipe
                var createDto = new CreateRecipeDto
                {
                    Title = "Test Gumbo",
                    Description = "A delicious Louisiana gumbo recipe",
                    Ingredients = new List<string> { "Chicken", "Sausage", "Roux", "Okra", "Rice" },
                    Instructions = new List<string> { "Make the roux", "Add meat", "Simmer", "Serve over rice" },
                    Category = RecipeCategory.MainDish,
                    Difficulty = RecipeDifficulty.Intermediate,
                    CookTime = "2 hours",
                    PrepTime = "30 minutes",
                    Servings = 6,
                    Tags = new List<string> { "Cajun", "Soup", "Comfort Food" }
                };

                var createdRecipe = await _recipeService.CreateRecipeAsync(createDto, "testUser");
                
                // Get all recipes (should include our new one)
                var allRecipes = await _recipeService.GetAllRecipesAsync();
                
                // Update the recipe
                var updateDto = new UpdateRecipeDto
                {
                    Title = "Updated Test Gumbo",
                    Description = "An updated delicious Louisiana gumbo recipe"
                };
                
                var updatedRecipe = await _recipeService.UpdateRecipeAsync(createdRecipe.Id, updateDto);
                
                // Like the recipe
                var likedRecipe = await _recipeService.ToggleLikeAsync(createdRecipe.Id);
                
                // Get the recipe by ID
                var retrievedRecipe = await _recipeService.GetRecipeByIdAsync(createdRecipe.Id);
                
                // Delete the recipe
                var deleted = await _recipeService.DeleteRecipeAsync(createdRecipe.Id);

                return Ok(new
                {
                    message = "Database operations completed successfully",
                    created = createdRecipe,
                    updated = updatedRecipe,
                    liked = likedRecipe,
                    retrieved = retrievedRecipe,
                    deleted = deleted
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }
    }
}
