using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class GamingInfo
    {
        public GamingInfo()
        {
            CartItems = new HashSet<CartItems>();
            WishListItems = new HashSet<WishListItems>();
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
        public ICollection<CartItems> CartItems { get; set; }
        public ICollection<WishListItems> WishListItems { get; set; }
    }
}
