using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DTO
{
    public class QuestionOptionCreationDto
    {
        [Required(ErrorMessage = "Option name is required")]
        [StringLength(1000, ErrorMessage = "Option name can't be longer than 1000 characters")]
        public string Name { get; set; }
    }
}
