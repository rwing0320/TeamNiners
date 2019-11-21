using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Models;

namespace TeamNiners.Tests
{
    public class TestDbContext
    {
        public dbo_NinersContext Context => InMemoryContext();
        private dbo_NinersContext InMemoryContext()
        {
            var options = new DbContextOptionsBuilder<dbo_NinersContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .EnableSensitiveDataLogging()
                .Options;
            var context = new dbo_NinersContext(options);

            return context;

            //        using (var context = new dbo_NinersContext(
            //new DbContextOptionsBuilder()
            //    .UseInMemoryDatabase(nameof(dbo_NinersContext))
            //    .Options))
            //        {
            //            context.Add(new Foo());
            //            context.SaveChanges();
            //        }
        }

    }
}
