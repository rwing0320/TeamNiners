using Microsoft.AspNetCore.Mvc;
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
using TeamNiners.Models;
using TeamNiners.Services;
using Xunit;

namespace TeamNiners.Tests
{
    class MemberLoginControllerTests
    {
        public IConfiguration connectionString;
        public static IOptions<AppSettings> _config;

        //dbo_NinersContext dbContext;
        IMemberService _memberService;
        //Sets up dependency injection to grab connectionString later
        MemberLoginsController ml;
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
        public async Task  Check_GetMemberLogin_ReturnMemberLoginObjectIsNotNull()
        {
            // Arrange
            int id = 1;
            var dbContext = DbContextMock.context(nameof(Check_GetMemberLogin_ReturnMemberLoginObjectIsNotNull));
            var controller = new MemberLoginsController(dbContext,null);


            // Act
            var returnedMember = await controller.GetMemberLogin(id);
            var memberId = returnedMember.Value.MemberId;

            // Assert
            Assert.AreEqual(memberId, id);
            
        }

        [Test]
        public async Task Check_GetMemberLogin_ReturnMemberLoginObjectIsNull()
        {
            // Arrange
            int id = 0;
            var dbContext = DbContextMock.context(nameof(Check_GetMemberLogin_ReturnMemberLoginObjectIsNull));
            var controller = new MemberLoginsController(dbContext, null);
            
            // Act
            var returnedMember = await controller.GetMemberLogin(id);
            //Assert
            Assert.AreEqual(returnedMember.Value, null);

        }

       
    }
}
