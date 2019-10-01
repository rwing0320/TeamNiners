using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;
using TeamNiners.Services;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        BusinessLogin bl = new BusinessLogin();

        

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult getAll()
        {

            var model = new BusinessLogin();
            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("/api/users/authenticate")]
        public IActionResult Authenticate([FromBody] BusinessLogin userParam)
        {
            //var user = _userService.Authenticate(userParam.Email, userParam.Psswd);

            bl = _userService.Authenticate(userParam.Email, userParam.Psswd);

            if (bl == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });

            }

            return Ok(bl);
        }

        [HttpPost]
        [Route("/api/users/logout")]
        public IActionResult Logout([FromBody] BusinessLogin userParam)
        {
            int id = userParam.Id;
            
            //set user token to nothing
            bl = _userService.Logout(id);
            //var user = _userService.Logout();

            

            return Ok(bl);

            //if (user == null)
            //    return BadRequest(new { message = "Username or password is incorrect" });

            //return Ok(user);
        }

    }
}