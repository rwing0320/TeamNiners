using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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

        string connectionString = "Server=(localdb)\\mssqllocaldb;Database=dbo_Niners;Trusted_Connection=True;";
        List<BusinessLogin> generatedList = new List<BusinessLogin>();

        public List<String> FillList(string password)
        {
            List<String> generatedList = new List<String>();

            using (SqlConnection connection =
                       new SqlConnection(connectionString))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                // A table mapping names the DataTable.
                adapter.TableMappings.Add("BusinessLogin", "Logins");

                connection.Open();

                SqlCommand command = new SqlCommand(
                    "SELECT * FROM dbo.BusinessLogin;",
                    connection);
                command.CommandType = CommandType.Text;

                // Set the SqlDataAdapter's SelectCommand.
                adapter.SelectCommand = command;

                // Fill the DataSet.
                DataSet dataSet = new DataSet("LoginValues");
                adapter.Fill(dataSet);

                connection.Close();

                //foreach (DataRow dr in dataSet)
                {

                }


            }

            string temp = _users.Select(x => {
                x.Psswd = password;
                return x;
            }).ToString();


            return generatedList;

        }

 


        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public BusinessLogin Authenticate(string username, string password)
        {
            /* not working as intended, will fix soon
            List<String> tempList = FillList(password);
            */
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
