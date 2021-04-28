using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IUserRepository
    {
        User GetUserByEmail(string email);
        void CreateUser(User user);
        void UpdateUser(User user);
        void DeleteUser(User user);
    }
}
