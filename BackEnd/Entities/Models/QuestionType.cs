using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    public class QuestionType
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(40, ErrorMessage = "Name can't be longer than 40 characters")]
        public string Name { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
