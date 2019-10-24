using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Helpers;
using TeamNiners.Services;
using TeamNiners.Models;

namespace TeamNiners.Tests
{
    class SecurityTests
    {

        //Sets up dependency injection to grab connectionString later
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;



        [Test]
        public void Check_Hashing_Functionality()
        {

            //Arrange
            SecurityService securityService = new SecurityService();
            MemberLogin inputValues = new MemberLogin();
            inputValues.MemberPassword = "hi";
            inputValues.Salt = "xNWYEEmXnxGXDps%";
            string expectedPasswordOutput = "K3vUgsrEhZaB6l/j3X0TQ/Z+celEzbbcrAhR23aBGz0=";

            //Act
            string actualPasswordOutput = securityService.HashingCheckLogin(inputValues.MemberPassword, inputValues.Salt);

            //Assert
            Assert.AreEqual(expectedPasswordOutput, actualPasswordOutput);
        }
    }
}
