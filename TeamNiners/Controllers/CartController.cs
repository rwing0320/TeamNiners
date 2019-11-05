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

            UserTempStorage.cartID = cart.CartId;
 
            return Ok(cart);
        }

        [HttpPost]
        [Route("/api/cart/saveCartItems")]
        public async Task<IActionResult> SaveCartItem()
        {
            CartItems cartItem = new CartItems();
            cartItem.CartId = UserTempStorage.cartID;
            cartItem.GameId = UserTempStorage.gameID;
            //MemberLogin member = new MemberLogin();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateCart", new { id = cartItem.CartItemdId }, cartItem);

        }


      
    }
}
