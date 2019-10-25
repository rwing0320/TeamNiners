using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Helpers;
using TeamNiners.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    public class MemberAccountController : ControllerBase
    {
        private readonly dbo_NinersContext _context;


        public MemberAccountController(dbo_NinersContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostMember([FromBody] Member Member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Member.Add(Member);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostMember", new { id = Member.MemberId }, Member);
        }

        [HttpGet]
        [Route("/api/MemberAccount/GetMember")]
        public async Task<IActionResult> GetMember()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var member = await _context.Member.FindAsync(UserTempStorage.memberID);


            return Ok(member);
        }

       

        [HttpPost]
        [Route("/api/MemberAccount/AddMemberLogin")]
        public async Task<IActionResult> PostMemberLogin([FromBody] MemberLogin memberLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MemberLogin.Add(memberLogin);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetBusinessGames", new { id = businessGamingInfo.GameId }, businessGamingInfo);
            return CreatedAtAction("PostMemberLogin", new { id = memberLogin.MemberId }, memberLogin);
        }
     
    }
}
