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
using Microsoft.Extensions.Configuration;
using System.IO;



namespace TeamNiners.Services
{
    
    public static class User {
        public static object UserInfo;
    }

    public interface IUserService
    {
        BusinessLogin Authenticate(string username, string password);
        IEnumerable<BusinessLogin> GetAll();
        BusinessLogin Logout(BusinessLogin bl);
    }
    public class UserService : IUserService
    {

        //Sets up dependency injection to grab connectionString later
        public IConfiguration connectionString;

        public void SetupUserServiceConnection()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;
        }

        Dictionary<string, string> userList = new Dictionary<string, string>();
        //List<BusinessLogin> generatedList = new List<BusinessLogin>();

        public BusinessLogin Logout(BusinessLogin bl)
        {
            bl.Token = null;

            return bl;
        }

        public DataTable GetBusinessLoginData()
        {
            SetupUserServiceConnection();

            DataTable tempTable = new DataTable();


            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("BusinessLogin", "Logins");

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                    "SELECT * FROM dbo.BusinessLogin;",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.SelectCommand = command;

                adapter.Fill(tempTable);

                sqlConnection.Close();

                return tempTable;
            }
        }

        public void setBusinessLoginData(DataTable table,string token, int id)
        {
            DataTable tempTable = new DataTable();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("BusinessLogin", "Logins");

                sqlConnection.Open();

                //SqlCommand command1 = new SqlCommand(
                //   "SELECT * FROM dbo.BusinessLogin;",
                //   sqlConnection);

                //command1.CommandType = CommandType.Text;

                //adapter.SelectCommand = command1;

                //adapter.Fill(tempTable);


                SqlCommand command2 = new SqlCommand(
                    "UPDATE dbo.BusinessLogin SET token = '" + token + "' WHERE id = " + id + ";",
                    sqlConnection);
                                                             
                command2.CommandType = CommandType.Text;

                adapter.UpdateCommand = command2;

                adapter.Update(table);

                //adapter.AcceptChangesDuringUpdate;

                sqlConnection.Close();

                Console.WriteLine("This is my table: " + table);

            }
        }
        public void FillUserList(DataTable userDataTable)
        {

            //Adds each row from the BusinessLogin table into a Dictionary with KV = <Username, Password>
            for (int i = 0; i < userDataTable.Rows.Count; i++)
            {
                userList.Add((string)userDataTable.Rows[i]["email"], (string)userDataTable.Rows[i]["psswd"]);

            }

        }

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public BusinessLogin Authenticate(string username, string password)
        {
            DataTable tempTable;

            tempTable = GetBusinessLoginData();
            FillUserList(tempTable);

            //if (userList.Count == 0)
            //{
            //    tempTable = GetBusinessLoginData();
            //    FillUserList(tempTable);
            //}

            List<BusinessLogin> _users = new List<BusinessLogin>();

            //Checks Dictionary to see if it contains the Email
            if (userList.ContainsKey(username))
            {

                //Checks the key value pair to see if the password value is the same as entered
                if (userList[username] == password)
                {
                    //Adding the entry to a list for the var to pull from. Allows proper setup of token
                    _users.Add(new BusinessLogin { Id = 1, Email = username, Psswd = password });

                }

            }


            var user = _users.SingleOrDefault(x => x.Email == username && x.Psswd == password);



            if (user == null)
            {
                return null;
            }
            else
            {
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Email.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                // remove password before returning
                user.Psswd = null;


            }

            setBusinessLoginData(tempTable, user.Token, user.Id);

            return user;
        }

        public IEnumerable<BusinessLogin> GetAll()
        {
            //// return users without passwords
            //return _users.Select(x =>
            //{
            //    x.Psswd = null;
            //    return x;
            //});
            return null;
        }
    }
}
