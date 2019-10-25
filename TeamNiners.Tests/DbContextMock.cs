using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Models;

namespace TeamNiners.Tests
{
    public static class DbContextMock
    {
        public static dbo_NinersContext context(string dbName)
        {

            string connectionString = "Server = (localdb)\\mssqllocaldb; Database = dbo_Niners; Trusted_Connection = True";
            // Create options for DbContext instance
            var options = new DbContextOptionsBuilder<dbo_NinersContext>()
                .UseSqlServer(connectionString)
                .Options;

            // Create instance of DbContext
            var dbContext = new dbo_NinersContext(options);

            // Add entities in memory
            dbContext.Seed();

            return dbContext;
        }

    }
}
