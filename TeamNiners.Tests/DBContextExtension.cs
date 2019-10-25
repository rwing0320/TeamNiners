using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Models;

namespace TeamNiners.Tests
{
    public static class DBContextExtension
    {
        public static void Seed(this dbo_NinersContext dbContext)
        {
            // Add entities for DbContext instance
            dbContext.Member.Add(new Member
            {
                MemberId = 9,
                FirstName =  "ryan", 
                LastName = "wing",
                MemberAddress = "1 fake ave",
                MemberCity = "waterloo",
                MemberCountry = "canada",
                MemberPostalCode = "k8v9f7",
                MemberPhoneNumber = "5195557898",
                MemberEmail = "testing@test.com"             
                

            });
            
            //dbContext.SaveChanges();

            dbContext.MemberLogin.Add(new MemberLogin
            {
                MemberId = 9,
                MemberPassword = "tesing123",
                MemberUsername = ""
            });


            //dbContext.SaveChanges();
        }
    }
}
