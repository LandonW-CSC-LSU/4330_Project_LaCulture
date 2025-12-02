using System.ComponentModel.DataAnnotations;

namespace LaCulture.API.Models
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Date { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Location { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Website { get; set; }
        
        [Required]
        public double Latitude { get; set; }
        
        [Required]
        public double Longitude { get; set; }
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(50)]
        public string? Category { get; set; }

        public double? Popularity { get; set; }

        public string? Image { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
