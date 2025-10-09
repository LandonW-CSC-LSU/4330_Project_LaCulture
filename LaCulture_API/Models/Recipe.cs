using System.ComponentModel.DataAnnotations;

namespace LaCulture.API.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Author { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public List<string> Ingredients { get; set; } = new();
        
        [Required]
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
        
        public int Likes { get; set; } = 0;
        
        public int Comments { get; set; } = 0;
        
        public List<string> Tags { get; set; } = new();
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public string? UserId { get; set; }
    }

    public enum RecipeCategory
    {
        MainCourse = 0,
        Appetizer = 1,
        Dessert = 2,
        Beverage = 3,
        SideDish = 4,
        Snack = 5
    }

    public enum RecipeDifficulty
    {
        Easy = 0,
        Medium = 1,
        Hard = 2
    }
}