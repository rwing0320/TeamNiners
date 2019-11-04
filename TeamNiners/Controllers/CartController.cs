using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Helpers;
using TeamNiners.Models;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    
    public class CartController : ControllerBase
    {
        private readonly dbo_NinersContext _context;

        public CartController(dbo_NinersContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCart([FromBody] Cart cart)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateCart", new { id = cart.CartId }, cart);
        }

        [HttpPost]
        [Route("/api/cart/saveCart")]
        public IActionResult SaveCart([FromBody]Cart cart)
        {
            //MemberLogin member = new MemberLogin();

            UserTempStorage.cartID = cart.CartId;
            //var item = new MemberLogin();
            //var member = _memberService.createAccount(login);


            //_memberService.Authenticate(member.MemberUsername, member.MemberPassword,member.Salt);

            return Ok(cart);
        }
        //// GET: api/Cart
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Cart/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Cart
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Cart/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
