using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamNiners.Models;

namespace TeamNiners.Interfaces
{
    public interface IlocalService
    {

        int SetBusinessId(LocalEmployee id);
        int GetBusinessId();

    }
}
