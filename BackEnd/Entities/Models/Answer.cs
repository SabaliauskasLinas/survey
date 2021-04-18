using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public Submission Submission { get; set; }
        public int SubmissionId { get; set; }
        public Question Question { get; set; }
        public int QuestionId { get; set; }
    }
}
