using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class BusinessLogin
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Psswd { get; set; }
        public string Token { get; set; }
        public bool? IsValid { get; set; }
        public string BusinessName { get; set; }
        public string Salt { get; set; }

        public Business IdNavigation { get; set; }
    }
}
