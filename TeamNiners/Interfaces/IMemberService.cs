using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamNiners.Models;

namespace TeamNiners.Interfaces
{
    public interface IMemberService
    {
        MemberLogin Authenticate(string username, string password, string storedSalt);
        IEnumerable<MemberLogin> GetAll();
        MemberLogin Logout(string email);
        int GetMemberId(string email);
    }
}
