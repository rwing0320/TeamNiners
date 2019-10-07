using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class Business
    {
        public Business()
        {
            BusinessGames = new HashSet<BusinessGames>();
        }

        public int BusinessId { get; set; }
        public string BusinessAddress { get; set; }
        public string BusinessCity { get; set; }
        public string BusinessCountry { get; set; }
        public string BusinessPostalCode { get; set; }
        public string BusinessPhoneNumber { get; set; }

        public BusinessLogin BusinessLogin { get; set; }
        public ICollection<BusinessGames> BusinessGames { get; set; }
    }
}
