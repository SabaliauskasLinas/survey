using Entities.Models;
using iWonder.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace iWonder.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        ServerResult Register(RegistrationRequest model);
        ServerResult<byte[]> UploadAvatar(int userId, IFormFile file);
        bool EmailExists(string email);
        User GetById(int id);
    }
}