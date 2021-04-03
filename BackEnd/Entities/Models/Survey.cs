using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Models
{
    public class Survey
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(1000, ErrorMessage = "Name can't be longer than 1000 characters")]
        public string Name { get; set; }

        public string Description { get; set; }

        public bool OneSubmission { get; set; }

        public int TotalAnswers { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        [Required(ErrorMessage = "Questions are required")]
        public ICollection<Question> Questions { get; set; }
    }
}
