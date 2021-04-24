using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTO
{
    public class AnswerDto
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public int QuestionId { get; set; }

        public int SubmissionId { get; set; }

        public QuestionDto Question { get; set; }
    }
}
