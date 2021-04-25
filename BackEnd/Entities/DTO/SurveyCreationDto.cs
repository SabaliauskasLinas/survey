using Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class SurveyCreationDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(1000, ErrorMessage = "Name can't be longer than 1000 characters")]
        public string Name { get; set; }

        public string Description { get; set; }

        public string SubmissionMessage { get; set; }

        public bool OneSubmission { get; set; }

        public int UserId { get; set; }

        [Required(ErrorMessage = "Questions are required")]
        public ICollection<QuestionCreationDto> Questions { get; set; }
    }
}
