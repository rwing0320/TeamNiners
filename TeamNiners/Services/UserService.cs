using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TeamNiners.Helpers;
using TeamNiners.Models;

namespace TeamNiners.Services
{

    public interface IUserService
    {
        BusinessLogin Authenticate(string username, string password);
        IEnumerable<BusinessLogin> GetAll();
    }
    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<BusinessLogin> _users = new List<BusinessLogin>
        {
            new BusinessLogin { Id = 1, Email = "Test", Psswd = "User"}
        };

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public BusinessLogin Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Email == username && x.Psswd == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Psswd = null;

            return user;
        }

        public IEnumerable<BusinessLogin> GetAll()
        {
            // return users without passwords
            return _users.Select(x => {
                x.Psswd = null;
                return x;
            });
        }
    }
}
