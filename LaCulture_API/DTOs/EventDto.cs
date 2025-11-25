using System.ComponentModel.DataAnnotations;

namespace LaCulture.API.DTOs
{
    public class EventDto
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
    }

    public class CreateEventDto
    {
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
    }

    public class UpdateEventDto
    {
        [StringLength(200)]
        public string? Title { get; set; }
        
        [StringLength(100)]
        public string? Date { get; set; }
        
        [StringLength(100)]
        public string? Location { get; set; }
        
        [StringLength(500)]
        public string? Website { get; set; }
        
        public double? Latitude { get; set; }
        
        public double? Longitude { get; set; }
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(50)]
        public string? Category { get; set; }

        public double? Popularity { get; set; }
    }
}
