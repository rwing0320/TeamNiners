﻿using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class MemberLogin
    {
        public MemberLogin()
        {
            WishList = new HashSet<WishList>();
        }

        public int MemberId { get; set; }
        public string MemberUsername { get; set; }
        public string MemberPassword { get; set; }
        public bool IsValid { get; set; }
        public string MemberName { get; set; }
        public string Token { get; set; }
        public string Salt { get; set; }

        public Member Member { get; set; }
        public ICollection<WishList> WishList { get; set; }
    }
}
