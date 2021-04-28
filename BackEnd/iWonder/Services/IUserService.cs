using Entities.Models;
using iWonder.Models;
using System.Collections.Generic;

namespace iWonder.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        RegistrationResponse Register(RegistrationRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
}