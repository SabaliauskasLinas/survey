using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Required { get; set; }
        public Survey Survey { get; set; }
        public int SurveyId { get; set; }
        public QuestionType QuestionType { get; set; }
        public int QuestionTypeId { get; set; }
    }
}
