using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;
using TeamNiners.Interfaces;
using TeamNiners.Helpers;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        BusinessLogin bl = new BusinessLogin();
        ChangePassword changePass = new ChangePassword();
        public IlocalService _localService;


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
        
        /// <summary>
        /// Authenticates user login information and creates token
        /// </summary>
        [AllowAnonymous]
        [HttpPost]
        [Route("/api/users/authenticate")]
        public IActionResult Authenticate([FromBody] BusinessLogin userParam)
        {
            //var user = _userService.Authenticate(userParam.Email, userParam.Psswd);
            UserTempStorage.salt = userParam.Salt;

            bl = _userService.Authenticate(userParam.Email, userParam.Psswd, userParam.Salt);

            if (bl == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });

            }
            UserTempStorage.salt = bl.Salt;
            UserTempStorage.email = bl.Email;

            return Ok(bl);
        }

        /// <summary>
        /// Allows a user to change their password
        /// </summary>
        [AllowAnonymous]
        [HttpPut]
        [Route("/api/users/changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePassword inputValues)
        {
            bl = _userService.ChangePassword(inputValues.OldPassword, inputValues.NewPassword,
                UserTempStorage.email, UserTempStorage.salt);
            return Ok(inputValues);
        }

        
        [HttpPost]
        [Route("/api/users/employeeId")]
        public IActionResult EmployeeId([FromBody]LocalEmployee id)
        {

            UserTempStorage.id = id.businessId;


            return Ok(UserTempStorage.id);
        }

        [HttpPost]
        [Route("/api/product/productID")]
        public IActionResult ProductID([FromBody]GamingInfo id)
        {

            UserTempStorage.gameID = id.GameId;


            return Ok(UserTempStorage.gameID);
        }


        [HttpGet]
        [Route("/api/users/getEmployeeId")]
        public IActionResult GetEmployeeId()
        {



            //LocalEmployee lemp = new LocalEmployee();

            //lemp.businessId = id.businessId;
            //id.businessId = id;


            return Ok(UserTempStorage.id);
        }



        [HttpPost]
        [Route("/api/users/logout")]
        public IActionResult Logout([FromBody] BusinessLogin userParam)
        {

            string email = UserTempStorage.email;

            //set user token to nothing
            bl = _userService.Logout(email);
            //var user = _userService.Logout();

            UserTempStorage.email = "";

            return Ok(bl);

            //if (user == null)
            //    return BadRequest(new { message = "Username or password is incorrect" });

            //return Ok(user);
        }

    }
}