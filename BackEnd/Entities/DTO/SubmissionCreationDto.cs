using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class SubmissionCreationDto
    {
        [Required(ErrorMessage = "Survey ID is required")]
        public int SurveyId { get; set; }

        public int? UserId { get; set; }

        [Required(ErrorMessage = "Answers are required")]
        public IEnumerable<AnswerCreationDto> Answers { get; set; }
    }
}
