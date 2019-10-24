using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Services;
using TeamNiners.Helpers;
using TeamNiners.Controllers;
using Moq;
using TeamNiners.Models;
using TeamNiners.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace TeamNiners.Tests
{
    class MemberTests
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
        public void Check_GetMemberID_Functionality()
        {

            MemberService memberService = new MemberService(_config);

            //Arrange
            string testUsername = "hi@hi.com";
            int expectedID = 1;
            int actualID = 0;

            //Act

            actualID = memberService.GetMemberID(testUsername);

            //Assert

            Assert.AreEqual(expectedID, actualID);
        }


        [Test]
        public void Check_AuthenticateToken_Functionality()
        {

            MemberService memberService = new MemberService(_config);

            //Arrange
            MemberLogin expectedLogin = new MemberLogin();
            expectedLogin.MemberUsername = "hi@hi.com";
            expectedLogin.MemberPassword = "K3vUgsrEhZaB6l/j3X0TQ/Z+celEzbbcrAhR23aBGz0=";
            expectedLogin.Salt = "xNWYEEmXnxGXDps%";
            expectedLogin.Token = "";

            MemberLogin actualLogin = new MemberLogin();

            actualLogin = memberService.Authenticate(expectedLogin.MemberUsername, expectedLogin.MemberPassword, expectedLogin.Salt);

            //Assert

            //Assert.AreEqual(expectedID, actualID);
        }
    }
}
