using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class MemberLogin
    {
        public int MemberId { get; set; }
        public string MemberUsername { get; set; }
        public string MemberPassword { get; set; }

        public Member Member { get; set; }
    }
}
