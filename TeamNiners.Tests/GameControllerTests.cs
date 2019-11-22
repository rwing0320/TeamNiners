using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TeamNiners.Controllers;
using TeamNiners.Helpers;
using TeamNiners.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TeamNiners.Tests
{
    public class GameControllerTests
    {
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;
        private dbo_NinersContext _dbContext;

        public GameControllerTests()
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
            GamingInfo _gi = new GamingInfo() { GameId = 1, GameTitle = "Halo", GameDescription = "Good Game", ReleaseDate = DateTime.Today,
                                                GamePlatform = 1, GameCategory = 1, GamePrice = 10};
            _dbContext.GamingInfo.Add(_gi);
            _dbContext.SaveChanges();

            BusinessGames _bg = new BusinessGames() { BusinessId = 1 ,GameId = 1 };
            _dbContext.BusinessGames.Add(_bg);
            _dbContext.SaveChanges();

            GamingPlatform _pl = new GamingPlatform() { PlatformId = 1, PlatformName = "SNES" };
            _dbContext.GamingPlatform.Add(_pl);
            _dbContext.SaveChanges();

            GamingCategory _ca = new GamingCategory() { CategoryId = 1, CategoryName = "Puzzle" };
            _dbContext.GamingCategory.Add(_ca);
            _dbContext.SaveChanges();

        }

        [OneTimeSetUp]
        public void Prepare()
        {


        }

        [Test]
        public void Check_DeleteGame_ReturnMessage()
        {
            // Arrange
            var controller = new GameController(_dbContext);

            UserTempStorage.gameID = 1;

            // Act
            string game = controller.DeleteCartItem(UserTempStorage.gameID);
            // Assert
            Assert.AreEqual(game, "Deleted Succefully");

        }

        [Test]
        public async Task Check_PostBusinessGame_GetID()
        {
            // Arrange
            var controller = new GameController(_dbContext);
            UserTempStorage.id = 1;


            BusinessGames businessGamingInfo = new BusinessGames();
            businessGamingInfo.GameId = 2;

            // Act
            IActionResult addBusinessGame = await controller.PostBusinessGame(businessGamingInfo);
            CreatedAtActionResult results = addBusinessGame as CreatedAtActionResult;

            string var = results.RouteValues["id"].ToString();

            //string var = results.RouteValues["id"].ToString();
            // Assert
            Assert.AreEqual(var, "2");
        }

        [Test]
        public async Task Check_PostGame_NewID()
        {
            // Arrange
            var controller = new GameController(_dbContext);
            GamingInfo gamingInfo = new GamingInfo();
            gamingInfo.GameId = 2;
            gamingInfo.GameTitle = "Hello";
            gamingInfo.GameDescription = "Hello World";
            gamingInfo.ReleaseDate = DateTime.Today;
            gamingInfo.GamePlatform = 1;
            gamingInfo.GameCategory = 2;
            gamingInfo.GamePrice = 10;

            // Act
            IActionResult addGame = await controller.PostGame(gamingInfo);
            CreatedAtActionResult results = addGame as CreatedAtActionResult;

            string var = results.RouteValues["id"].ToString();
            // Assert
            Assert.AreEqual(var, "2");

        }

        [Test]
        public void CheckPlatform_InsertId_ReturnName()
        {
            var controller = new GameController(_dbContext);

            string platform = "SNES";
            GamingPlatform plat = new GamingPlatform();
            plat.PlatformId = 1;

            string getName = controller.GetGamePlat(plat.PlatformId);

            Assert.AreEqual(getName, platform);
        }

        [Test]
        public void CheckCategory_InsertId_ReturnName()
        {
            var controller = new GameController(_dbContext);

            string category = "Puzzle";
            GamingCategory cat = new GamingCategory();
            cat.CategoryId = 1;

            string getName = controller.GetGameCategory(cat.CategoryId);

            Assert.AreEqual(getName, category);
        }
    }

}