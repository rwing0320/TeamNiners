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

namespace TeamNiners.Tests
{


    class CartControllerTests
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
        public void Check_DisplayGames_ReturnListOfGamesNotNull()
        {
            // Arrange
           // int id = 1;
            var dbContext = DbContextMock.context(nameof(Check_DisplayGames_ReturnListOfGamesNotNull));
            var controller = new CartController(dbContext);


            // Act
            UserTempStorage.cartID = 1;
             
            
            var returnGamesList = controller.DisplayGames_ShowGamesPage();
          
            // Assert
            Assert.AreNotEqual(returnGamesList, null);

        }

        [Test]
        public void Check_DisplayGames_ReturnListOfGamesIsNull()
        {
            // Arrange
            // int id = 1;
            var dbContext = DbContextMock.context(nameof(Check_DisplayGames_ReturnListOfGamesNotNull));
            var controller = new CartController(dbContext);


            // Act
            UserTempStorage.cartID = 2;


            var returnGamesList = controller.DisplayGames_ShowGamesPage().Count;

            // Assert
            Assert.AreEqual(returnGamesList, 0);

        }


        [Test]
        public void Check_GetCartCount_ReturnCartCount2()
        {
            // Arrange
            // int id = 1;
            var dbContext = DbContextMock.context(nameof(Check_DisplayGames_ReturnListOfGamesNotNull));
            var controller = new CartController(dbContext);


            // Act
            UserTempStorage.cartID = 1;


            int returnCartCount = controller.GetCartCount();

            // Assert
            Assert.AreEqual(returnCartCount, 2);

        }


        [Test]
        public void Check_GetCartCount_ReturnCartCountEmpty()
        {
            // Arrange
            // int id = 1;
            var dbContext = DbContextMock.context(nameof(Check_DisplayGames_ReturnListOfGamesNotNull));
            var controller = new CartController(dbContext);


            // Act
            //var returnedMember = await controller.GetMemberLogin(id);
            //var memberId = returnedMember.Value.MemberId;
            UserTempStorage.cartID = 2;


            int returnCartCount = controller.GetCartCount();

            // Assert
            Assert.AreEqual(returnCartCount, 0);

        }

    }
}
