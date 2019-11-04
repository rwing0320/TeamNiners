using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class Cart
    {
        public Cart()
        {
            CartItems = new HashSet<CartItems>();
        }

        public int CartId { get; set; }
        public int MemberId { get; set; }

        public Member Member { get; set; }
        public ICollection<CartItems> CartItems { get; set; }
    }
}
