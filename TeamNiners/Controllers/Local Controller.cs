using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamNiners.Models;

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    public class Local_Controller : ControllerBase
    {
        LocalEmployee lem;

        [HttpGet]
        public IActionResult GetAll(int id)
        {

            if(lem == null)
            {
                lem = new LocalEmployee();
                lem.businessId = id;
            }


            return Ok(lem.businessId);
            
        }


    }
}
