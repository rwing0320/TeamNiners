using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    public class GameCategoryController : ControllerBase
    {

        private readonly dbo_NinersContext _context;

        public GameCategoryController(dbo_NinersContext context)
        {
            _context = context;
        }

        // GET: api/APIBusinesses
        [HttpGet]
        public IEnumerable<GamingCategory> GetGameCat()
        {
            return _context.GamingCategory;
        }

      

    }
}
