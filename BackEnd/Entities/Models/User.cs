using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First name is required")]
        [StringLength(60, ErrorMessage = "First name can't be longer than 60 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(60, ErrorMessage = "Last name can't be longer than 60 characters")]
        public string LastName { get; set; }

        public string Description { get; set; }

        public ICollection<Survey> Surveys { get; set; }
        //public string Username { get; set; }
        //public string PasswordHash { get; set; }
        //public string AvatarImage { get; set; }
    }
}
