using System;
using System.Collections.Generic;

namespace TeamNiners.Models
{
    public partial class GamingCategory
    {
        public GamingCategory()
        {
            GamingInfo = new HashSet<GamingInfo>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public ICollection<GamingInfo> GamingInfo { get; set; }
    }
}
