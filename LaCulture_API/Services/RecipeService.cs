using LaCulture.API.Models;
using LaCulture.API.DTOs;

namespace LaCulture.API.Services
{
    public interface IRecipeService
    {
        Task<IEnumerable<Recipe>> GetAllRecipesAsync(RecipeFiltersDto? filters = null);
        Task<Recipe?> GetRecipeByIdAsync(int id);
        Task<Recipe> CreateRecipeAsync(CreateRecipeDto createRecipeDto, string userId = "anonymous");
        Task<Recipe?> UpdateRecipeAsync(int id, UpdateRecipeDto updateRecipeDto);
        Task<bool> DeleteRecipeAsync(int id);
        Task<Recipe?> ToggleLikeAsync(int id);
    }

    public class InMemoryRecipeService : IRecipeService
    {
        private readonly List<Recipe> _recipes;
        private int _nextId = 1;

        public InMemoryRecipeService()
        {
            _recipes = GetSeedData();
            _nextId = _recipes.Count + 1;
        }

        public Task<IEnumerable<Recipe>> GetAllRecipesAsync(RecipeFiltersDto? filters = null)
        {
            var recipes = _recipes.AsEnumerable();

            if (filters != null)
            {
                if (filters.Category.HasValue)
                {
                    recipes = recipes.Where(r => r.Category == filters.Category.Value);
                }

                if (filters.Difficulty.HasValue)
                {
                    recipes = recipes.Where(r => r.Difficulty == filters.Difficulty.Value);
                }

                if (!string.IsNullOrWhiteSpace(filters.Search))
                {
                    var searchTerm = filters.Search.ToLowerInvariant();
                    recipes = recipes.Where(r => 
                        r.Title.ToLowerInvariant().Contains(searchTerm) ||
                        r.Description.ToLowerInvariant().Contains(searchTerm) ||
                        r.Author.ToLowerInvariant().Contains(searchTerm) ||
                        r.Tags.Any(tag => tag.ToLowerInvariant().Contains(searchTerm))
                    );
                }

                if (filters.Tags != null && filters.Tags.Any())
                {
                    recipes = recipes.Where(r => 
                        filters.Tags.Any(filterTag => 
                            r.Tags.Any(recipeTag => 
                                recipeTag.ToLowerInvariant().Contains(filterTag.ToLowerInvariant())
                            )
                        )
                    );
                }
            }

            return Task.FromResult(recipes.OrderByDescending(r => r.CreatedAt).AsEnumerable());
        }

        public Task<Recipe?> GetRecipeByIdAsync(int id)
        {
            var recipe = _recipes.FirstOrDefault(r => r.Id == id);
            return Task.FromResult(recipe);
        }

        public Task<Recipe> CreateRecipeAsync(CreateRecipeDto createRecipeDto, string userId = "anonymous")
        {
            var recipe = new Recipe
            {
                Id = _nextId++,
                Title = createRecipeDto.Title,
                Author = userId == "anonymous" ? "Anonymous Chef" : userId,
                Description = createRecipeDto.Description,
                Ingredients = createRecipeDto.Ingredients,
                Instructions = createRecipeDto.Instructions,
                Image = createRecipeDto.Image,
                Category = createRecipeDto.Category,
                Difficulty = createRecipeDto.Difficulty,
                CookTime = createRecipeDto.CookTime,
                PrepTime = createRecipeDto.PrepTime,
                Servings = createRecipeDto.Servings,
                Tags = createRecipeDto.Tags,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                UserId = userId
            };

            _recipes.Add(recipe);
            return Task.FromResult(recipe);
        }

        public Task<Recipe?> UpdateRecipeAsync(int id, UpdateRecipeDto updateRecipeDto)
        {
            var recipe = _recipes.FirstOrDefault(r => r.Id == id);
            if (recipe == null) return Task.FromResult<Recipe?>(null);

            // Update only provided fields
            if (!string.IsNullOrWhiteSpace(updateRecipeDto.Title))
                recipe.Title = updateRecipeDto.Title;
            
            if (!string.IsNullOrWhiteSpace(updateRecipeDto.Description))
                recipe.Description = updateRecipeDto.Description;
            
            if (updateRecipeDto.Ingredients != null && updateRecipeDto.Ingredients.Any())
                recipe.Ingredients = updateRecipeDto.Ingredients;
            
            if (updateRecipeDto.Instructions != null && updateRecipeDto.Instructions.Any())
                recipe.Instructions = updateRecipeDto.Instructions;
            
            if (!string.IsNullOrEmpty(updateRecipeDto.Image))
                recipe.Image = updateRecipeDto.Image;
            
            if (updateRecipeDto.Category.HasValue)
                recipe.Category = updateRecipeDto.Category.Value;
            
            if (updateRecipeDto.Difficulty.HasValue)
                recipe.Difficulty = updateRecipeDto.Difficulty.Value;
            
            if (!string.IsNullOrWhiteSpace(updateRecipeDto.CookTime))
                recipe.CookTime = updateRecipeDto.CookTime;
            
            if (!string.IsNullOrWhiteSpace(updateRecipeDto.PrepTime))
                recipe.PrepTime = updateRecipeDto.PrepTime;
            
            if (updateRecipeDto.Servings.HasValue)
                recipe.Servings = updateRecipeDto.Servings.Value;
            
            if (updateRecipeDto.Tags != null)
                recipe.Tags = updateRecipeDto.Tags;

            recipe.UpdatedAt = DateTime.UtcNow;

            return Task.FromResult<Recipe?>(recipe);
        }

        public Task<bool> DeleteRecipeAsync(int id)
        {
            var recipe = _recipes.FirstOrDefault(r => r.Id == id);
            if (recipe == null) return Task.FromResult(false);

            _recipes.Remove(recipe);
            return Task.FromResult(true);
        }

        public Task<Recipe?> ToggleLikeAsync(int id)
        {
            var recipe = _recipes.FirstOrDefault(r => r.Id == id);
            if (recipe == null) return Task.FromResult<Recipe?>(null);

            recipe.Likes++;
            recipe.UpdatedAt = DateTime.UtcNow;

            return Task.FromResult<Recipe?>(recipe);
        }

        private List<Recipe> GetSeedData()
        {
            return new List<Recipe>
            {
                new Recipe
                {
                    Id = 1,
                    Title = "Gumbo",
                    Author = "Chef Marie",
                    Description = "Traditional Louisiana gumbo with okra and seafood",
                    Ingredients = new List<string>
                    {
                        "1/2 cup vegetable oil",
                        "1/2 cup all-purpose flour",
                        "1 large onion, diced",
                        "1 bell pepper, diced",
                        "2 celery stalks, diced",
                        "1 lb okra, sliced",
                        "1 lb shrimp, peeled",
                        "1 lb crab meat",
                        "8 cups seafood stock",
                        "Salt, pepper, and Cajun seasoning to taste"
                    },
                    Instructions = new List<string>
                    {
                        "Make a dark roux with oil and flour",
                        "Add the holy trinity (onion, bell pepper, celery)",
                        "Add okra and cook until tender",
                        "Add stock gradually, stirring constantly",
                        "Simmer for 1 hour",
                        "Add seafood in final 10 minutes",
                        "Season to taste and serve over rice"
                    },
                    Image = "assets/images/gumbo.jpg",
                    Category = RecipeCategory.MainCourse,
                    Difficulty = RecipeDifficulty.Medium,
                    CookTime = "2 hours",
                    PrepTime = "30 minutes",
                    Servings = 8,
                    Likes = 45,
                    Comments = 12,
                    Tags = new List<string> { "seafood", "traditional", "spicy" },
                    CreatedAt = DateTime.UtcNow.AddDays(-30),
                    UpdatedAt = DateTime.UtcNow.AddDays(-30)
                },
                new Recipe
                {
                    Id = 2,
                    Title = "Jambalaya",
                    Author = "Cajun Cook",
                    Description = "Spicy rice dish with chicken, sausage, and shrimp",
                    Ingredients = new List<string>
                    {
                        "2 cups long-grain white rice",
                        "1 lb chicken thighs, diced",
                        "1 lb andouille sausage, sliced",
                        "1 lb shrimp, peeled",
                        "1 onion, diced",
                        "1 bell pepper, diced",
                        "2 celery stalks, diced",
                        "3 cups chicken stock",
                        "Cajun seasoning to taste"
                    },
                    Instructions = new List<string>
                    {
                        "Brown the chicken and sausage in a large pot",
                        "Add the holy trinity and cook until soft",
                        "Add rice and stir to coat",
                        "Add stock and seasonings",
                        "Bring to a boil, then simmer covered for 18 minutes",
                        "Add shrimp in final 5 minutes",
                        "Let rest 5 minutes before serving"
                    },
                    Image = "assets/images/jambalaya.jpg",
                    Category = RecipeCategory.MainCourse,
                    Difficulty = RecipeDifficulty.Easy,
                    CookTime = "45 minutes",
                    PrepTime = "20 minutes",
                    Servings = 6,
                    Likes = 32,
                    Comments = 8,
                    Tags = new List<string> { "rice", "one-pot", "spicy" },
                    CreatedAt = DateTime.UtcNow.AddDays(-20),
                    UpdatedAt = DateTime.UtcNow.AddDays(-20)
                },
                new Recipe
                {
                    Id = 3,
                    Title = "Beignets",
                    Author = "Cafe Master",
                    Description = "Classic New Orleans powdered sugar donuts",
                    Ingredients = new List<string>
                    {
                        "1 package active dry yeast",
                        "1/4 cup warm water",
                        "1/4 cup sugar",
                        "1/2 cup milk",
                        "1/4 cup butter",
                        "1 egg",
                        "3 cups all-purpose flour",
                        "1/2 tsp salt",
                        "Oil for frying",
                        "Powdered sugar for dusting"
                    },
                    Instructions = new List<string>
                    {
                        "Dissolve yeast in warm water with a pinch of sugar",
                        "Heat milk and butter until butter melts",
                        "Mix flour, sugar, and salt in a large bowl",
                        "Add yeast mixture, milk mixture, and egg",
                        "Knead until smooth, then let rise for 1 hour",
                        "Roll out and cut into squares",
                        "Fry in hot oil until golden brown",
                        "Dust heavily with powdered sugar"
                    },
                    Image = "assets/images/beignets.jpg",
                    Category = RecipeCategory.Dessert,
                    Difficulty = RecipeDifficulty.Medium,
                    CookTime = "20 minutes",
                    PrepTime = "1 hour 30 minutes",
                    Servings = 12,
                    Likes = 67,
                    Comments = 23,
                    Tags = new List<string> { "sweet", "fried", "breakfast" },
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    UpdatedAt = DateTime.UtcNow.AddDays(-10)
                },
                new Recipe
                {
                    Id = 4,
                    Title = "Red Beans and Rice",
                    Author = "Home Cook",
                    Description = "Monday tradition with kidney beans and andouille",
                    Ingredients = new List<string>
                    {
                        "1 lb dried red kidney beans",
                        "1 lb andouille sausage, sliced",
                        "1 ham bone or ham hock",
                        "1 onion, diced",
                        "1 bell pepper, diced",
                        "2 celery stalks, diced",
                        "3 cloves garlic, minced",
                        "2 bay leaves",
                        "Cajun seasoning to taste",
                        "Cooked white rice for serving"
                    },
                    Instructions = new List<string>
                    {
                        "Soak beans overnight in water",
                        "Brown the sausage in a large pot",
                        "Add the holy trinity and garlic, cook until soft",
                        "Add beans, ham bone, and enough water to cover",
                        "Add bay leaves and seasonings",
                        "Simmer for 2-3 hours until beans are tender",
                        "Mash some beans to thicken",
                        "Serve over rice"
                    },
                    Image = "assets/images/redbeans.jpg",
                    Category = RecipeCategory.MainCourse,
                    Difficulty = RecipeDifficulty.Easy,
                    CookTime = "3 hours",
                    PrepTime = "15 minutes",
                    Servings = 8,
                    Likes = 28,
                    Comments = 15,
                    Tags = new List<string> { "beans", "comfort-food", "traditional" },
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UpdatedAt = DateTime.UtcNow.AddDays(-5)
                }
            };
        }
    }
}