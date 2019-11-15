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
        //[HttpPost]
        //[Route("/api/cart/saveCartItems")]
        //public async Task<ActionResult<CartItems>> SaveCartItem()
        //{
        //    CartItems cartItem = new CartItems();
        //    cartItem.CartId = UserTempStorage.cartID;
        //    cartItem.GameId = UserTempStorage.gameID;
        //    //MemberLogin member = new MemberLogin();

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.CartItems.Add(cartItem);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("CreateCart", new { id = cartItem.CartItemdId }, cartItem);

        //}


        [HttpPost]
        [Route("/api/cart/saveCartItemsFromWishList")]
        public async Task<IActionResult> SaveWishListCartItem([FromBody] CartItems cartItem)
        {
            //CartItems cartItem = new CartItems();
            cartItem.CartId = UserTempStorage.cartID;
            //cartItem.GameId = UserTempStorage.gameID;
            //MemberLogin member = new MemberLogin();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateCart", new { id = cartItem.CartItemdId }, cartItem);

        }

        [HttpGet]
        [Route("/api/game/showgames_cart")]
        public List<ShowGameItem> DisplayGames_ShowGamesPage()
        {
            List<ShowGameItem> gameList = new List<ShowGameItem>();
            gameList = ShowGameItem.GetGamesListForCart();

            return gameList;
        }

        [HttpGet]
        [Route("/api/cart/getCartCount")]
        public int GetCartCount()
        {
            //List<ShowGameItem> gameList = new List<ShowGameItem>();
            //gameList = ShowGameItem.GetGamesListForWishList();
            var cartList = _context.CartItems.Where(p => p.CartId == UserTempStorage.cartID);

            int cartCount = 0;

           foreach(var item in cartList)
            {
                cartCount++;
            }


            return cartCount;
        }

        [HttpPost]
        [Route("/api/cart/deleteCartItem")]
        public async Task<IActionResult> DeleteCartItem([FromBody] CartItems ci)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            ci.CartId = UserTempStorage.cartID;


            IQueryable<CartItems> cartItems = _context.CartItems.Where(p => p.GameId == ci.GameId && p.CartId== UserTempStorage.cartID);

            int recordId = 0;
            foreach (var item in cartItems)
            {
                recordId = item.CartItemdId;
                break;
            }

            var cartItem = _context.CartItems.Find(recordId);

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(ci);
        }

    }
}
