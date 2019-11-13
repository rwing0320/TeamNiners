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

namespace TeamNiners.Tests
{
    class WishListControllerTests
    {
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;
       
        [SetUp]
        public void Setup()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;

        }



        [OneTimeSetUp]
        public void Prepare()
        {


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
