using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTO
{
    public class AnswerDto
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int QuestionId { get; set; }
    }
}
