using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamNiners.Models;
using TeamNiners.Helpers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamNiners.Controllers
{
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly dbo_NinersContext _context;
        GamingInfo gi = new GamingInfo();
        ShowGameItem gameHelper = new ShowGameItem();

        public GameController(dbo_NinersContext context)
        {
            _context = context;
        }

        // GET: api/APIBusinesses
        [HttpGet]
        public IEnumerable<GamingInfo> GetGames()
        {
            return _context.GamingInfo;
        }



        //[HttpPost]
        //public IActionResult PostGame([FromBody]GamingInfo userParam)
        //{
        //    gi = 
        //}
        // POST: api/APIBusinesses
        [HttpPost]
        public async Task<IActionResult> PostGame([FromBody] GamingInfo gamingInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GamingInfo.Add(gamingInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGames", new { id = gamingInfo.GameId }, gamingInfo);
        }


        [HttpPost]
        [Route("/api/Game/AddBusinessGame")]
        public async Task<IActionResult> PostBusinessGame([FromBody] BusinessGames businessGamingInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            businessGamingInfo.BusinessId = UserTempStorage.id;

            _context.BusinessGames.Add(businessGamingInfo);
            await _context.SaveChangesAsync();



            //return CreatedAtAction("GetBusinessGames", new { id = businessGamingInfo.GameId }, businessGamingInfo);
            return CreatedAtAction("GetBusinessGames", new { id = businessGamingInfo.GameId }, businessGamingInfo);
        }

        [HttpGet]
        [Route("/api/Game/GetGame")]
        public IEnumerable<GamingInfo> GetGame()
        {
            var gameID = UserTempStorage.gameID;
            var game = _context.GamingInfo.Where(p => p.GameId == gameID);


            return game;
        }
        // POST: api/Game
        //[HttpPost]
        //public async Task<ActionResult<GamingInfo>> PostGame([FromBody]GamingInfo userParam)
        //{
        //    //_context.Songs.Add(item);

        //    //_context.GamingInfo.Add(userParam);
        //    //await _context.SaveChangesAsync();

        //    //return Ok(_context.GamingInfo);
        //    //return CreatedAtAction(_context.GamingInfo);
        //    //return CreatedAtAction(nameof(GetSong), new { id = item.Id }, item);
        //

        //// GET: api/<controller>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<controller>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<controller>
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<controller>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
        [HttpGet]
        [Route("/api/game/showgames_business/{filterValue}")]
        public List<ShowGameItem> DisplayGames_ShowGamesPage([FromRoute]string filterValue)
        {

            List<ShowGameItem> gameList = getBusinessGames(filterValue);

            return gameList;
        }


        public List<ShowGameItem> getBusinessGames(string filter)
        {
            List<ShowGameItem> gameList = new List<ShowGameItem>();
            //ShowGameItem gameHelper = new ShowGameItem();
            gameList = ShowGameItem.GetGamesList(filter);

            return gameList;

        }

    }
}
