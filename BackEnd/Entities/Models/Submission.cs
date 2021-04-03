using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Models
{
    public class Submission
    {
        public int Id { get; set; }

        public Survey Survey { get; set; }

        public int SurveyId { get; set; }

        public User User { get; set; }

        public int? UserId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public IEnumerable<Answer> Answers { get; set; }
    }
}
