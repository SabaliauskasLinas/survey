using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class AnswerCreationDto
    {
        public string Content { get; set; }
        public int QuestionId { get; set; }
    }
}
