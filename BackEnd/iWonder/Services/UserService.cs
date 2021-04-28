using Contracts;
using Entities.Models;
using iWonder.Helpers;
using iWonder.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

        public RegistrationResponse Register(RegistrationRequest model)
        {
            var existingUser = _repository.User.GetUserByEmail(model.Email);
            if (existingUser != null)
                return new RegistrationResponse { ErrorMessage = "User with a specified email already exists" };

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

            return new RegistrationResponse { Success = true };
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
