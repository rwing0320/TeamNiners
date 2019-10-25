using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Helpers;
using TeamNiners.Services;

namespace TeamNiners.Tests
{
    class UserTestsFInal
    {
        //Sets up dependency injection to grab connectionString later
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;

        [SetUp]
        public void Setup()
        {

        }


        [OneTimeSetUp]
        public void Prepare()
        {

            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;

            _config = Options.Create(config.GetSection("AppSettings").Get<AppSettings>());
        }

        [Test]
        public void Check_GetUserID_Functionality()
        {

            UserService userService = new UserService(_config);

            //Arrange
            string testUsername = "example@example.com";
            int expectedID = 1;
            int actualID = 0;

            //Act

            actualID = userService.GetUserID(testUsername);

            //Assert

            Assert.AreEqual(expectedID, actualID);
        }



    }
}
