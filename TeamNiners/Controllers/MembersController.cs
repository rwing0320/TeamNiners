using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;
using TeamNiners.Interfaces;
using TeamNiners.Helpers;
using System.Linq;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private IMemberService _memberService;

        MemberLogin ml = new MemberLogin();
        // public IlocalService _localService;
        private readonly dbo_NinersContext _context;

        public MembersController(dbo_NinersContext context, IMemberService memberService)
        {
            _memberService = memberService;
            _context = context;
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


        // [AllowAnonymous]
        [HttpPost]
        [Route("/api/members/checkEmail")]
        public IActionResult CheckEmail([FromBody]Member login)
        {
            
            //var user = _userService.Authenticate(userParam.Email, userParam.Psswd);
             var memberLogin = _context.Member.Where(p => p.MemberEmail == login.MemberEmail);

            //var memberLogin = _context.MemberLogin.Find();
           // log.d(memberLogin.Count());

            if (memberLogin.Count() == 0)
            {
                return Ok(new { message = "" });

            }

            //MemberTempStorage.memberEmail = ml.MemberUsername;

            return Ok(new { message = "Email Already Used!"});
        }

        [HttpPost]
        [Route("/api/members/memberId")]
        public IActionResult MemberId([FromBody]LocalMember id)
        {

            MemberTempStorage.memberId = id.memberId;
            UserTempStorage.memberID = id.memberId;

            return Ok(MemberTempStorage.memberId);
        }

        [HttpGet]
        [Route("/api/members/getEmployeeId")]
        public IActionResult GetMemberId()
        {
            return Ok(UserTempStorage.memberID);
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


        }

    }
}