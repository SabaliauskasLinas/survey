using Contracts;
using Entities.Models;
using iWonder.Helpers;
using iWonder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace iWonder.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, IRepositoryWrapper repository)
        {
            _appSettings = appSettings.Value;
            _repository = repository;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _repository.User.GetUserByEmail(model.Email);
            if (user == null) 
                return null;

            var saltedHash = SecurityHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(model.Password), user.PasswordSalt);
            if (!SecurityHelper.CompareByteArrays(user.PasswordHash, saltedHash))
                return null;

            var token = generateJwtToken(user);
            return new AuthenticateResponse(user, token);
        }

        public ServerResult Register(RegistrationRequest model)
        {
            var existingUser = _repository.User.GetUserByEmail(model.Email);
            if (existingUser != null)
                return new ServerResult { ErrorMessage = "User with a specified email already exists" };

            var salt = SecurityHelper.GetSalt();
            var saltedHash = SecurityHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(model.Password), salt);

            _repository.User.CreateUser(new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PasswordHash = saltedHash,
                PasswordSalt = salt
            });

            _repository.Save();

            return new ServerResult { Success = true };
        }

        public ServerResult<byte[]> UploadAvatar(int userId, IFormFile file)
        {
            try
            {
                if (file.Length / 1024 / 1024 > 2)
                    return new ServerResult<byte[]> { ErrorMessage = "File size must not exceed 2 MB" };

                byte[] fileBytes;
                var user = _repository.User.GetUserById(userId);
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    fileBytes = ms.ToArray();
                    user.Avatar = fileBytes;
                }

                _repository.User.UpdateUser(user);
                _repository.Save();

                return new ServerResult<byte[]> { Success = true, Data = fileBytes };
            }
            catch (Exception ex)
            {
                return new ServerResult<byte[]> { ErrorMessage = ex.Message };
            }
        }

        public User GetById(int id)
        {
            return _repository.User.GetUserById(id);
        }

        public bool EmailExists(string email)
        {
            var existingUser = _repository.User.GetUserByEmail(email);
            return existingUser != null;
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
