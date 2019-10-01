using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class AccountStatus
    {
        public int AccountId { get; set; }
        public bool LoggedIn { get; set; }

        public Business Account { get; set; }
    }
}
