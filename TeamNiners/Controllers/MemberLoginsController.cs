using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamNiners.Helpers;
using TeamNiners.Interfaces;
using TeamNiners.Models;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberLoginsController : ControllerBase
    {
        private IUserService _userService;
        public IlocalService _localService;
        private IMemberService _memberService;

        MemberLogin ml = new MemberLogin();

        private readonly dbo_NinersContext _context;

        public MemberLoginsController(dbo_NinersContext context, IMemberService memberService)
        {
            _memberService = memberService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Authenticate()
        {
            var user = _userService.Authenticate("", "", "");

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });


            return Ok(user);
        }

        
        [HttpPost]
        [Route("/api/member/createMember")]
        public IActionResult CreateAccount([FromBody]MemberLogin login)
        {
            //MemberLogin member = new MemberLogin();


            //var item = new MemberLogin();
              var member = _memberService.createAccount(login);


            //_memberService.Authenticate(member.MemberUsername, member.MemberPassword,member.Salt);

            return Ok(member);
        }

        // GET: api/MemberLogins
        [HttpGet]
        public IEnumerable<MemberLogin> GetMemberLogin()
        {
            return _context.MemberLogin;
        }

        // GET: api/MemberLogins/5
        [HttpGet("{id}")]
        [Route("/api/member/GetMemberLogin")]
        public async Task<ActionResult<MemberLogin>> GetMemberLogin([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var memberLogin = await _context.MemberLogin.FindAsync(id);

            
            //var memberLogin = _context.MemberLogin.Where(p => p.MemberId == id);

            if (memberLogin == null)
            {
                return NotFound(new { Message = "No Member Found"});
            }

            return memberLogin;
        }

        // PUT: api/MemberLogins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemberLogin([FromRoute] int id, [FromBody] MemberLogin memberLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != memberLogin.MemberId)
            {
                return BadRequest();
            }

            _context.Entry(memberLogin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberLoginExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MemberLogins
        [HttpPost]
        public async Task<IActionResult> PostMemberLogin([FromBody] MemberLogin memberLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MemberLogin.Add(memberLogin);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MemberLoginExists(memberLogin.MemberId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMemberLogin", new { id = memberLogin.MemberId }, memberLogin);
        }

        // DELETE: api/MemberLogins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemberLogin([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var memberLogin = await _context.MemberLogin.FindAsync(id);
            if (memberLogin == null)
            {
                return NotFound();
            }

            _context.MemberLogin.Remove(memberLogin);
            await _context.SaveChangesAsync();

            return Ok(memberLogin);
        }

        [HttpPost]
        [Route("/api/member/memberId")]
        public IActionResult MemberId([FromBody]LocalMember id)
        {

            UserTempStorage.memberID = id.memberId;


            return Ok(UserTempStorage.memberID);
        }

    

        [HttpPost]
        [Route("/api/member/memberData")]
        public IActionResult MemberData([FromBody]MemberLogin id)
        {

            UserTempStorage.email = id.MemberUsername;
            UserTempStorage.salt = id.Salt;


            return Ok(UserTempStorage.memberID);
        }

       
        [HttpPost]
        [Route("/api/member/saveMemberCart")]
        public IActionResult saveCartIdOnLogin([FromBody] MemberLogin memberLogin)
        {

            IQueryable<Cart> cart = _context.Cart.Where(p => p.MemberId == memberLogin.MemberId);

            int cartId = 0;
            foreach (Cart result in cart)
            {
                cartId = result.CartId;
            }

             UserTempStorage.cartID = cartId;

            return Ok();
        }

        [HttpPost]
        [Route("/api/member/saveMemberWishList")]
        public IActionResult saveWishListIdOnLogin([FromBody] MemberLogin memberLogin)
        {

            IQueryable<WishList> wish = _context.WishList.Where(p => p.MemberId == memberLogin.MemberId);

            int wishId = 0;
            foreach (WishList result in wish)
            {
                wishId = result.WishListId;
            }

            UserTempStorage.wishID = wishId;

            return Ok();
        }


        [HttpGet]
        [Route("/api/member/memberId")]
        public IActionResult GetEmployeeId()
        {
            

            string[] myArray = { UserTempStorage.memberID.ToString(), UserTempStorage.email, UserTempStorage.salt }; 
            return Ok(myArray);

        }

        [HttpGet]
        [Route("/api/member/username/{memberID}")]
        public IActionResult GetMemberUsername(int memberID)
        {
            IQueryable<MemberLogin> user = _context.MemberLogin.Where(x => x.MemberId == memberID);

            string username = "";
            foreach (MemberLogin result in user)
            {
                username = result.MemberName;
            }

            return Ok(username);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("/api/member/changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePassword inputValues)
        {
            ml = _memberService.ChangePassword(inputValues.OldPassword, inputValues.NewPassword,
                UserTempStorage.email, UserTempStorage.salt);
            return Ok(inputValues);
        }

        private bool MemberLoginExists(int id)
        {
            return _context.MemberLogin.Any(e => e.MemberId == id);
        }
    }
}