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
        private readonly dbo_NinersContext _context;

        public MemberLoginsController(dbo_NinersContext context)
        {
        
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

        // GET: api/MemberLogins
        [HttpGet]
        public IEnumerable<MemberLogin> GetMemberLogin()
        {
            return _context.MemberLogin;
        }

        // GET: api/MemberLogins/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMemberLogin([FromRoute] int id)
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

            return Ok(memberLogin);
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
        public IActionResult EmployeeId([FromBody]LocalMember id)
        {

            UserTempStorage.id = id.memberId;


            return Ok(UserTempStorage.id);
        }


        private bool MemberLoginExists(int id)
        {
            return _context.MemberLogin.Any(e => e.MemberId == id);
        }
    }
}