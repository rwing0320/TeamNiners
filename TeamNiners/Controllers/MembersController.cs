using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;
using TeamNiners.Interfaces;
using TeamNiners.Helpers;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private IMemberService _memberService;

        MemberLogin ml = new MemberLogin();
       // public IlocalService _localService;


        public MembersController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet]
        public IActionResult getAll()
        {

            var model = new MemberLogin();
            return Ok(model);
        }

       // [AllowAnonymous]
        [HttpPost]
        [Route("/api/members/authenticate")]
        public IActionResult Authenticate([FromBody] MemberLogin userParam)
        {
            //var user = _userService.Authenticate(userParam.Email, userParam.Psswd);

             ml = _memberService.Authenticate(userParam.MemberUsername, userParam.MemberPassword, userParam.Salt);

            if (ml == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });

            }

            MemberTempStorage.memberEmail = ml.MemberUsername;

            return Ok(ml);
        }

        [HttpPost]
        [Route("/api/members/memberId")]
        public IActionResult MemberId([FromBody]LocalMember id)
        {

            MemberTempStorage.memberId = id.memberId;


            return Ok(MemberTempStorage.memberId);
        }

        [HttpGet]
        [Route("/api/members/getEmployeeId")]
        public IActionResult GetMemberId()
        {

           

            //LocalEmployee lemp = new LocalEmployee();

            //lemp.businessId = id.businessId;
            //id.businessId = id;


            return Ok(MemberTempStorage.memberId);
        }



        [HttpPost]
        [Route("/api/members/logout")]
        public IActionResult Logout([FromBody] MemberLogin userParam)
        {

            string email = MemberTempStorage.memberEmail;

            //set user token to nothing
            ml = _memberService.Logout(email);
            //var user = _userService.Logout();

            MemberTempStorage.memberEmail = "";

            return Ok(ml);

            //if (user == null)
            //    return BadRequest(new { message = "Username or password is incorrect" });

            //return Ok(user);
        }

    }
}