using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class WishList
    {
        public int WishListId { get; set; }
        public int MemberId { get; set; }

        public MemberLogin Member { get; set; }
    }
}
