using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int MemberId { get; set; }
        public int GameId { get; set; }

        public GamingInfo Game { get; set; }
        public Member Member { get; set; }
    }
}
