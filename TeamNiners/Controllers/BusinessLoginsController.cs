using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamNiners.Models;
using TeamNiners.Services;

namespace TeamNiners.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessLoginsController : ControllerBase
    {
        private readonly dbo_NinersContext _context;
        private IUserService _userService;


        public BusinessLoginsController(dbo_NinersContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Authenticate()
        {
            var user = _userService.Authenticate("", "");

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }


        // GET: api/BusinessLogins
        [HttpGet]
        public IEnumerable<BusinessLogin> GetBusinessLogin()
        {
            return _context.BusinessLogin;
        }

        // GET: api/BusinessLogins/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusinessLogin([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var businessLogin = await _context.BusinessLogin.FindAsync(id);

            if (businessLogin == null)
            {
                return NotFound();
            }

            return Ok(businessLogin);
        }

        // PUT: api/BusinessLogins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessLogin([FromRoute] int id, [FromBody] BusinessLogin businessLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != businessLogin.Id)
            {
                return BadRequest();
            }

            _context.Entry(businessLogin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusinessLoginExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BusinessLogins
        [HttpPost]
        public async Task<IActionResult> PostBusinessLogin([FromBody] BusinessLogin businessLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.BusinessLogin.Add(businessLogin);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BusinessLoginExists(businessLogin.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBusinessLogin", new { id = businessLogin.Id }, businessLogin);
        }

        // DELETE: api/BusinessLogins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessLogin([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var businessLogin = await _context.BusinessLogin.FindAsync(id);
            if (businessLogin == null)
            {
                return NotFound();
            }

            _context.BusinessLogin.Remove(businessLogin);
            await _context.SaveChangesAsync();

            return Ok(businessLogin);
        }

        private bool BusinessLoginExists(int id)
        {
            return _context.BusinessLogin.Any(e => e.Id == id);
        }
    }
}