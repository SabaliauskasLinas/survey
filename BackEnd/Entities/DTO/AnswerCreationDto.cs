using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class AnswerCreationDto
    {
        [StringLength(1000, ErrorMessage = "Answer can't be longer than 1000 characters")]
        public string Text { get; set; }
        public int QuestionId { get; set; }
    }
}
