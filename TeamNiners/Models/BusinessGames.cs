using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class BusinessGames
    {
        public int BusinessId { get; set; }
        public int GameId { get; set; }

        public Business Business { get; set; }
        public GamingInfo Game { get; set; }
    }
}
