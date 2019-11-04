using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class CartItems
    {
        public int CartItemdId { get; set; }
        public int CartId { get; set; }
        public int GameId { get; set; }

        public Cart Cart { get; set; }
        public GamingInfo Game { get; set; }
    }
}
