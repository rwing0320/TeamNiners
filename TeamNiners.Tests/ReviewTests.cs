using Castle.Core.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TeamNiners.Controllers;
using TeamNiners.Helpers;
using TeamNiners.Models;


namespace TeamNiners.Tests
{
    class ReviewTests
    {

        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;
        private dbo_NinersContext _dbContext;

        public ReviewTests()
        {
            var options = new DbContextOptionsBuilder<dbo_NinersContext>()
                 .UseInMemoryDatabase(Guid.NewGuid().ToString())
                 .EnableSensitiveDataLogging()
                 .Options;
            _dbContext = new dbo_NinersContext(options);

        }

        [SetUp]
        public void Setup()
        {
            Review review_checkGet = new Review()
            {
                ReviewId = 1,
                MemberId = 1,
                MemberUsername = "hi",
                GameId = 1,
                ReviewContent = "Excellent game!",
                ReviewDate = DateTime.Parse("10/20/2019")

            };
            _dbContext.Review.Add(review_checkGet);
            _dbContext.SaveChanges();
        }


        [Test]
        public async Task AddReview_CheckIfSuccessfullyAdded()
        {
            // Arrange
            var controller = new ReviewController(_dbContext);

            Review addReviewCheck = new Review();
            addReviewCheck.ReviewId = 2;
            addReviewCheck.MemberId = 2;
            addReviewCheck.MemberUsername = "pete";
            addReviewCheck.GameId = 2;
            addReviewCheck.ReviewContent = "Great game, cant get enough of it.";
            addReviewCheck.ReviewDate = DateTime.Parse("11/10/2019");


            // Act
            IActionResult returnReviewAddedSuccessfully = await controller.NewReview(addReviewCheck);
            CreatedAtActionResult result = returnReviewAddedSuccessfully as CreatedAtActionResult;
            string var = result.RouteValues["id"].ToString();


            // Assert
            Assert.AreEqual(var, "2");

        }



        [Test]
        public void GetReview_CheckIfSuccessfullyRetrieved()
        {
            // Arrange
            var controller = new ReviewController(_dbContext);

            UserTempStorage.gameID = 1;


            // Act
            IEnumerable<Review> returnReviewRetrieved = controller.GetReviews();
            var result = returnReviewRetrieved;

            int? gameID = 0;

            foreach (var review in result)
            {
                gameID = review.GameId;
            }


            // Assert
            Assert.AreEqual(gameID, 1);

        }




    }
}
