using Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class SurveyDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool OneSubmission { get; set; }

        public DateTime CreatedAt { get; set; }

        public int TotalAnswers { get; set; }

        public int UserId { get; set; }

        public ICollection<QuestionDto> Questions { get; set; }
    }
}
