using Microsoft.AspNetCore.Mvc;
using LaCulture.API.Models;
using LaCulture.API.DTOs;
using LaCulture.API.Services;

namespace LaCulture.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        // GET: api/recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeDto>>> GetRecipes(
            [FromQuery] RecipeCategory? category = null,
            [FromQuery] RecipeDifficulty? difficulty = null,
            [FromQuery] string? search = null,
            [FromQuery] List<string>? tags = null)
        {
            try
            {
                var filters = new RecipeFiltersDto
                {
                    Category = category,
                    Difficulty = difficulty,
                    Search = search,
                    Tags = tags
                };

                var recipes = await _recipeService.GetAllRecipesAsync(filters);
                var recipeDtos = recipes.Select(MapToDto);

                return Ok(recipeDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving recipes", error = ex.Message });
            }
        }

        // GET: api/recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
        {
            try
            {
                var recipe = await _recipeService.GetRecipeByIdAsync(id);
                if (recipe == null)
                {
                    return NotFound(new { message = $"Recipe with ID {id} not found" });
                }

                return Ok(MapToDto(recipe));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the recipe", error = ex.Message });
            }
        }

        // POST: api/recipes
        [HttpPost]
        public async Task<ActionResult<RecipeDto>> CreateRecipe([FromBody] CreateRecipeDto createRecipeDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // In a real application, you would get the user ID from authentication context
                var userId = "current-user-id"; // This would come from JWT token or authentication system

                var recipe = await _recipeService.CreateRecipeAsync(createRecipeDto, userId);
                var recipeDto = MapToDto(recipe);

                return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipeDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the recipe", error = ex.Message });
            }
        }

        // PUT: api/recipes/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RecipeDto>> UpdateRecipe(int id, [FromBody] UpdateRecipeDto updateRecipeDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var recipe = await _recipeService.UpdateRecipeAsync(id, updateRecipeDto);
                if (recipe == null)
                {
                    return NotFound(new { message = $"Recipe with ID {id} not found" });
                }

                return Ok(MapToDto(recipe));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the recipe", error = ex.Message });
            }
        }

        // DELETE: api/recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            try
            {
                var success = await _recipeService.DeleteRecipeAsync(id);
                if (!success)
                {
                    return NotFound(new { message = $"Recipe with ID {id} not found" });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the recipe", error = ex.Message });
            }
        }

        // POST: api/recipes/5/like
        [HttpPost("{id}/like")]
        public async Task<ActionResult<RecipeDto>> ToggleLike(int id)
        {
            try
            {
                var recipe = await _recipeService.ToggleLikeAsync(id);
                if (recipe == null)
                {
                    return NotFound(new { message = $"Recipe with ID {id} not found" });
                }

                return Ok(MapToDto(recipe));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the recipe likes", error = ex.Message });
            }
        }

        // POST: api/recipes/upload-image
        [HttpPost("upload-image")]
        public Task<ActionResult<object>> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return Task.FromResult<ActionResult<object>>(BadRequest(new { message = "No file provided" }));
                }

                // Validate file type
                var allowedTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif" };
                if (!allowedTypes.Contains(file.ContentType.ToLowerInvariant()))
                {
                    return Task.FromResult<ActionResult<object>>(BadRequest(new { message = "Invalid file type. Only JPEG, PNG, and GIF images are allowed." }));
                }

                // Validate file size (5MB max)
                if (file.Length > 5 * 1024 * 1024)
                {
                    return Task.FromResult<ActionResult<object>>(BadRequest(new { message = "File size cannot exceed 5MB" }));
                }

                // In a real application, you would save this to a cloud storage service or local storage
                // For now, we'll just return a mock URL
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                var imageUrl = $"/images/recipes/{fileName}";

                // TODO: Implement actual file upload logic here
                // await SaveFileToStorage(file, fileName);

                return Task.FromResult<ActionResult<object>>(Ok(new { imageUrl }));
            }
            catch (Exception ex)
            {
                return Task.FromResult<ActionResult<object>>(StatusCode(500, new { message = "An error occurred while uploading the image", error = ex.Message }));
            }
        }

        private static RecipeDto MapToDto(Recipe recipe)
        {
            return new RecipeDto
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Author = recipe.Author,
                Description = recipe.Description,
                Ingredients = recipe.Ingredients,
                Instructions = recipe.Instructions,
                Image = recipe.Image,
                Category = recipe.Category,
                Difficulty = recipe.Difficulty,
                CookTime = recipe.CookTime,
                PrepTime = recipe.PrepTime,
                Servings = recipe.Servings,
                Likes = recipe.Likes,
                Comments = recipe.Comments,
                Tags = recipe.Tags,
                CreatedAt = recipe.CreatedAt,
                UpdatedAt = recipe.UpdatedAt
            };
        }
    }
}