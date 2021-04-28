using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

        public string Email { get; set; }

        [JsonIgnore]
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public ICollection<Survey> Surveys { get; set; }
    }
}
