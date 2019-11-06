using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class WishListItems
    {
        public int Id { get; set; }
        public int WishListId { get; set; }
        public int ProductId { get; set; }

        public GamingInfo Product { get; set; }
    }
}
