using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamNiners.Models;

namespace TeamNiners.Interfaces
{
    public interface IUserService
    {
        BusinessLogin Authenticate(string username, string password, string storedSalt);
        IEnumerable<BusinessLogin> GetAll();
        BusinessLogin Logout(string email);
        int GetUserID(string email);
        BusinessLogin ChangePassword(string oldPassword, string newPassword, string username, string salt);
    }
}
