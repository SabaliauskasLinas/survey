using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class QuestionCreationDto
    {
        [Required(ErrorMessage = "Question name is required")]
        [StringLength(1000, ErrorMessage = "Question name can't be longer than 1000 characters")]
        public string Name { get; set; }
        public bool Required { get; set; }
        public int SurveyId { get; set; }
        public int QuestionTypeId { get; set; }
        public ICollection<QuestionOptionCreationDto> Options { get; set; }
    }
}
