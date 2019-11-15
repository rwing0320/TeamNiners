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
    [ApiController]
    public class ReviewController : ControllerBase
    {

        private readonly dbo_NinersContext _context;

        public ReviewController(dbo_NinersContext context)
        {
            _context = context;
        }

        /*  Returns all of the reviews for the current Game that
            is being viewed on Products page  */
        [HttpGet]
        [Route("/api/review/reviewlist")]
        public IEnumerable<Review> GetReviews()
        {
            /*
            var gameID = UserTempStorage.gameID;
            var reviews = _context.Review.Where(r => r.GameId == gameID);
            */
            return null;
        }

        /*
        [HttpPost]
        [Route("/api/review/new")]
        public async Task<IActionResult> NewReview([FromBody] Review reviewInfo)
        {


            _context.Review.Add(reviewInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("NewReview", new { id = reviewInfo.ReviewId }, reviewInfo);
        }

    */
    }
}
