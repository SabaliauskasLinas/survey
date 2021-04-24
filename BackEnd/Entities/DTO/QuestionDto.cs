using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTO
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Required { get; set; }
        public int QuestionTypeId { get; set; }
        public ICollection<QuestionOptionDto> Options { get; set; }
        public ICollection<AnswerDto> Answers { get; set; }
    }
}
