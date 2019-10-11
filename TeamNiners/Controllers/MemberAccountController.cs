using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        //// GET: api/<controller>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<controller>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<controller>
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<controller>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
