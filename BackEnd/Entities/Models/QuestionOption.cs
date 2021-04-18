using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Models
{
    public class QuestionOption
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Option name is required")]
        [StringLength(1000, ErrorMessage = "Option name can't be longer than 1000 characters")]
        public string Name { get; set; }
        public Question Question { get; set; }
        public int QuestionId { get; set; }
    }
}
