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

        MemberLogin AuthenticateNewUser(MemberLogin login);
        IEnumerable<MemberLogin> GetAll();

        MemberLogin createAccount(MemberLogin login);
        MemberLogin Logout(string email);
        int GetMemberID(string email);

        MemberLogin ChangePassword(string oldPassword, string newPassword, string username, string salt);
    }
}
