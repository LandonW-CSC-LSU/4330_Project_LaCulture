using System.ComponentModel.DataAnnotations;
using LaCulture.API.Models;

namespace LaCulture.API.DTOs
{
    public class CreateRecipeDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500, MinimumLength = 10)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [MinLength(1)]
        public List<string> Ingredients { get; set; } = new();
        
        [Required]
        [MinLength(1)]
        public List<string> Instructions { get; set; } = new();
        
        public string? Image { get; set; }
        
        [Required]
        public RecipeCategory Category { get; set; }
        
        [Required]
        public RecipeDifficulty Difficulty { get; set; }
        
        [Required]
        [StringLength(50)]
        public string CookTime { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string PrepTime { get; set; } = string.Empty;
        
        [Range(1, 50)]
        public int Servings { get; set; }
        
        public List<string> Tags { get; set; } = new();
    }

    public class UpdateRecipeDto
    {
        [StringLength(100, MinimumLength = 3)]
        public string? Title { get; set; }
        
        [StringLength(500, MinimumLength = 10)]
        public string? Description { get; set; }
        
        [MinLength(1)]
        public List<string>? Ingredients { get; set; }
        
        [MinLength(1)]
        public List<string>? Instructions { get; set; }
        
        public string? Image { get; set; }
        
        public RecipeCategory? Category { get; set; }
        
        public RecipeDifficulty? Difficulty { get; set; }
        
        [StringLength(50)]
        public string? CookTime { get; set; }
        
        [StringLength(50)]
        public string? PrepTime { get; set; }
        
        [Range(1, 50)]
        public int? Servings { get; set; }
        
        public List<string>? Tags { get; set; }
    }

    public class RecipeDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Ingredients { get; set; } = new();
        public List<string> Instructions { get; set; } = new();
        public string? Image { get; set; }
        public RecipeCategory Category { get; set; }
        public RecipeDifficulty Difficulty { get; set; }
        public string CookTime { get; set; } = string.Empty;
        public string PrepTime { get; set; } = string.Empty;
        public int Servings { get; set; }
        public int Likes { get; set; }
        public int Comments { get; set; }
        public List<string> Tags { get; set; } = new();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class RecipeFiltersDto
    {
        public RecipeCategory? Category { get; set; }
        public RecipeDifficulty? Difficulty { get; set; }
        public string? Search { get; set; }
        public List<string>? Tags { get; set; }
    }
}