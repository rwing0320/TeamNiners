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

    public class WishListController : ControllerBase
    {
        private readonly dbo_NinersContext _context;

        public WishListController(dbo_NinersContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWishList()
        {
            WishList wish = new WishList();

            wish.MemberId = UserTempStorage.memberID;
            

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WishList.Add(wish);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateWishList", new { id = wish.WishListId}, wish);
        }


        [HttpPost]
        [Route("/api/wishList/saveWishList")]
        public IActionResult SaveWishList([FromBody]WishList wish)
        {

            UserTempStorage.wishID = wish.WishListId;

            return Ok(wish);
        }

        [HttpPost]
        [Route("/api/wishList/saveWishListItems")]
        public async Task<IActionResult> SaveCartItem()
        {
            WishListItems wishItem = new WishListItems();
            wishItem.WishListId = UserTempStorage.wishID;
            wishItem.ProductId = UserTempStorage.gameID;
            //MemberLogin member = new MemberLogin();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WishListItems.Add(wishItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateCart", new { id = wishItem.Id }, wishItem);

        }

        [HttpGet]
        [Route("/api/game/showgames_wishList")]
        public List<ShowGameItem> DisplayGames_ShowGamesPage()
        {
            List<ShowGameItem> gameList = new List<ShowGameItem>();
            //ShowGameItem gameHelper = new ShowGameItem();
            gameList = ShowGameItem.GetGamesListForWishList();
           // List<ShowGameItem> gameList = getBusinessGames(filterValue);

            return gameList;
        }

        [HttpPost]
        [Route("/api/wishList/checkWishList")]
        public async Task<IActionResult> CheckWishList()
        {

            var wishList = _context.WishListItems.Where(p => p.WishListId == UserTempStorage.wishID && p.ProductId == UserTempStorage.gameID);

            //CartItems cartItem = new CartItems();
            //cartItem.CartId = UserTempStorage.cartID;
            //cartItem.GameId = UserTempStorage.gameID;
            //MemberLogin member = new MemberLogin();
            if (wishList.Count() == 0)
            {
                return Ok(new { message = "" });

            }

            //MemberTempStorage.memberEmail = ml.MemberUsername;

            return Ok(new { message = "Game Already In WishList!" });

        }

        [HttpDelete]
        [Route("/api/wishList/deleteWishItem")]
        public async Task<IActionResult> DeleteBusiness([FromRoute] WishListItems wi)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            wi.WishListId = UserTempStorage.wishID;


           var wishItem = _context.WishListItems.Where(p => p.ProductId == wi.ProductId && p.WishListId == UserTempStorage.wishID);
            //wishItem = wishItem.FirstOrDefault();
            if (wishItem == null)
            {
              return NotFound();
            }

            _context.WishListItems.Remove(wishItem.FirstOrDefault());
            await _context.SaveChangesAsync();

            return Ok(wi);
        }


    }
}
