using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTO
{
    public class SubmissionDto
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? UserId { get; set; }

        public ICollection<AnswerDto> Answers { get; set; }
    }
}
