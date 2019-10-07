using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class GamingInfo
    {
        public GamingInfo()
        {
            Cart = new HashSet<Cart>();
        }

        public int GameId { get; set; }
        public string GameTitle { get; set; }
        public string GameDescription { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int GamePlatform { get; set; }
        public int GameCategory { get; set; }
        public long GamePrice { get; set; }

        public GamingCategory GameCategoryNavigation { get; set; }
        public GamingPlatform GamePlatformNavigation { get; set; }
        public BusinessGames BusinessGames { get; set; }
        public ICollection<Cart> Cart { get; set; }
    }
}
