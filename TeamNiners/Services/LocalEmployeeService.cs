using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamNiners.Models;

namespace TeamNiners.Services
{
    public class LocalEmployeeService
    {
        public LocalEmployee businessId; 
        public void SetBusinessId(LocalEmployee id)
        {
            businessId = id;
        }

        public LocalEmployee GetBusinessId()
        {
            return businessId;
        }

    }
}
