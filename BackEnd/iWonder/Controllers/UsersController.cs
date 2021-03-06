using Entities.DTO;
using iWonder.Helpers;
using iWonder.Models;
using iWonder.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iWonder.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("Register")]
        public IActionResult Register(RegistrationRequest model)
        {
            return Ok(_userService.Register(model));
        }

        [HttpGet("EmailExists")]
        public IActionResult EmailExists(string email)
        {
            return Ok(_userService.EmailExists(email));
        }

        [Authorize]
        [HttpPost("UploadAvatar/{userId}")]
        public IActionResult UploadAvatar(int userId, IFormFile file)
        {
            var result = _userService.UploadAvatar(userId, file);
            if (!result.Success)
                return BadRequest(new { message = result.ErrorMessage });

            return Ok(result);
        }

        [Authorize]
        [HttpPost("SavePersonalInfo")]
        public IActionResult SavePersonalInfo(UserPersonalInfo args)
        {
            var result = _userService.SavePersonalInfo(args);
            if (!result.Success)
                return BadRequest(new { message = result.ErrorMessage });

            return Ok(result);
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordArgs args)
        {
            return Ok(_userService.ChangePassword(args));
        }
    }
}
