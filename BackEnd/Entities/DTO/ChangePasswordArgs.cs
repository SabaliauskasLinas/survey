using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTO
{
    public class ChangePasswordArgs
    {
        public int UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
