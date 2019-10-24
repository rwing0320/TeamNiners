﻿using System;
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

        Task<MemberLogin> createAccount(int memberId, string memberPassword, string memberUserName);
        MemberLogin Logout(string email);
        int GetMemberID(string email);
    }
}
