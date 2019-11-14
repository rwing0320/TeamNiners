using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int MemberId { get; set; }
        public int? GameId { get; set; }
        public string ReviewContent { get; set; }
    }
}
