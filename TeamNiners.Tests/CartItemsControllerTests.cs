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
    class CartItemsControllerTests
    {
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;
        private dbo_NinersContext _dbContext;

        public CartItemsControllerTests()
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
            CartItems _c = new CartItems()
            {
                CartItemdId = 1, CartId = 1, GameId = 1
            };
            _dbContext.CartItems.Add(_c);
            _dbContext.SaveChanges();
        }

        [OneTimeSetUp]
        public void Prepare()
        {


        }

        [Test]
        public async Task Check_DeleteCartItem_ReturnOk()
        {
            // Arrange
            var controller = new CartController(_dbContext);
            UserTempStorage.cartID = 1;


            CartItems ci = new CartItems();
            ci.GameId= 1;
            // Act
            IActionResult deleteItem = await controller.DeleteCartItem(ci);

            //string var = results.RouteValues["id"].ToString();
            // Assert
            Assert.IsInstanceOf<OkObjectResult>(deleteItem);

        }

        [Test]
        public async Task Check_DeleteAllFromCart_ReturnOk()
        {
            // Arrange
            var controller = new CartController(_dbContext);
            UserTempStorage.cartID = 1;
            int id = UserTempStorage.cartID;
            // Act
            IActionResult deleteCart = await controller.DeleteAllFromCartCart(id);

            //string var = results.RouteValues["id"].ToString();
            // Assert
            Assert.IsInstanceOf<OkObjectResult>(deleteCart);

        }


    }
}
