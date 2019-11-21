using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TeamNiners.Controllers;
using TeamNiners.Helpers;
using TeamNiners.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;
using Microsoft.EntityFrameworkCore;

namespace TeamNiners.Tests
{
   public class WishListControllerTests
    {
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;
        private dbo_NinersContext _dbContext;

        public WishListControllerTests()
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
            //var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            //var config = builder.Build();
            //connectionString = config;

            WishList _wl = new WishList() { MemberId = 1 };
            _dbContext.WishList.Add(_wl);
            _dbContext.SaveChanges();

            WishListItems _item1 = new WishListItems { WishListId = 1, ProductId = 1};
            _dbContext.WishListItems.Add(_item1);
            _dbContext.SaveChanges();


        }



        [OneTimeSetUp]
        public void Prepare()
        {


        }


        [Test]
        public async Task Check_CheckAddWishListItems_ReturnWishListItemID2()
        {
            // Arrange
           // var dbContext = DbContextMock.context(nameof(Check_CheckAddWishListItems_ReturnWishListItemFound));
            var controller = new WishListController(_dbContext);

            UserTempStorage.wishID = 1;
            UserTempStorage.gameID = 3;

            // Act


            IActionResult returnWishListItem = await controller.SaveCartItem();
            CreatedAtActionResult resultWLID = returnWishListItem as CreatedAtActionResult;

            string var = resultWLID.RouteValues["id"].ToString();

            // Assert


            Assert.AreEqual(var, "2");

        }



        [Test]
        public async Task Check_CheckWishList_ReturnWishListItemFound()
        {
            // Arrange
            var dbContext = DbContextMock.context(nameof(Check_CheckWishList_ReturnWishListItemFound));
            var controller = new WishListController(dbContext);

            UserTempStorage.wishID = 2;
            UserTempStorage.gameID = 1;

            // Act
            IActionResult returnWishListItem = await controller.CheckWishList();
            OkObjectResult okResult = returnWishListItem as OkObjectResult;

            string message = okResult.Value.ToString();
            string outputMessage = "Game Already In WishList!";

            string output = "";

            if (message.ToLower().Contains(outputMessage.ToLower()))
            {
                output = "found";
            }

            // Assert
            Assert.AreEqual(output, "found");

        }

        [Test]
        public async Task Check_CheckWishList_ReturnWishListItemNotFound()
        {
            // Arrange
            var dbContext = DbContextMock.context(nameof(Check_CheckWishList_ReturnWishListItemNotFound));
            var controller = new WishListController(dbContext);

            UserTempStorage.wishID = 3;
            UserTempStorage.gameID = 1;

            // Act
            IActionResult returnWishListItem = await controller.CheckWishList();
            OkObjectResult okResult = returnWishListItem as OkObjectResult;

            string message = okResult.Value.ToString();
            string outputMessage = "Game Already In WishList!";

            string output = "";

            if (message.ToLower().Contains(outputMessage.ToLower()))
            {
                output = "found";
            }

            // Assert
            Assert.AreEqual(output, "");

        }

    }
}
