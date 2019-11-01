using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        public IEnumerable<Cart> GetCart()
        {
            return _context.Cart;
        }

        [HttpPost]
        
        public async Task<IActionResult> PostCart()
        {
            Cart cart = new Cart();

            cart.MemberId = 1;
            cart.GameId = UserTempStorage.gameID;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            try
            {
                _context.Cart.Add(cart);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine();
                Console.WriteLine("This is the error:" +  e);

                Console.WriteLine();
            }

            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }
    }
}
