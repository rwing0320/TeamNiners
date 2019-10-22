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
using TeamNiners.Interfaces;
using System.Security.Cryptography;
using TeamNiners.Services;

namespace TeamNiners.Services
{

    public class MemberService : IMemberService
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


        public MemberLogin Logout(string email)
        {
            SetupUserServiceConnection();
            DataTable tempTable = new DataTable();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                tempTable = GetMemberLoginData();


                SqlCommand command2 = new SqlCommand(
                    "UPDATE dbo.MemberLogin SET Token = '', IsValid = 0 WHERE memberUsername = '" + email + "';",
                    sqlConnection);

                command2.CommandType = CommandType.Text;

                adapter.UpdateCommand = command2;

                adapter.Update(tempTable);

                command2.ExecuteNonQuery();

                sqlConnection.Close();



            }

            return null;

        }

        public int GetMemberID(string email)
        {
            int id = 0;
            DataSet ds = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                   "SELECT memberID FROM dbo.MemberLogin WHERE memberUsername = '" + email + "';",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.SelectCommand = command;

                command.ExecuteNonQuery();

                adapter.Fill(ds);

                id = (int)ds.Tables[0].Rows[0]["memberID"];

                sqlConnection.Close();

            }

            return id;
        }

        public DataTable GetMemberLoginData()
        {

            SetupUserServiceConnection();

            DataTable tempTable = new DataTable();


            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("MemberLogin", "Logins");

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                    "SELECT * FROM dbo.MemberLogin;",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.SelectCommand = command;

                adapter.Fill(tempTable);

                sqlConnection.Close();

                return tempTable;
            }
        }

        public void setMemberLoginData(DataTable table, string token, int id)
        {
            DataTable tempTable = new DataTable();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("MemberLogin", "Logins");

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                    "UPDATE dbo.MemberLogin SET Token = '" + token + "', IsValid = 1 WHERE memberID = " + id + ";",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.UpdateCommand = command;

                adapter.Update(table);

                command.ExecuteNonQuery();

                sqlConnection.Close();

            }
        }

        public void FillUserList(DataTable userDataTable)
        {

            //Adds each row from the BusinessLogin table into a Dictionary with KV = <Username, Password>
            for (int i = 0; i < userDataTable.Rows.Count; i++)
            {

                userList.Add((string)userDataTable.Rows[i]["memberUsername"], (string)userDataTable.Rows[i]["memberPassword"]);

            }

        }

        private readonly AppSettings _appSettings;

        public MemberService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public MemberLogin Authenticate(string username, string password, string storedSalt)
        {
            //Setting up necessary variables and a SecurityService instance to use hashing method
            var securityInstance = new SecurityService();
            DataTable tempTable;
            string HashedPassword = string.Empty;


            tempTable = GetMemberLoginData();
            FillUserList(tempTable);

            //Gets the Salt & ID for the specific user
            int id = GetMemberID(username);
            string salt = (string)tempTable.Rows[id - 1]["Salt"];

            List<MemberLogin> _users = new List<MemberLogin>();

            //Checks Dictionary to see if it contains the Email
            if (userList.ContainsKey(username))
            {
                //Use this for generating salts on account creation,
                //for now uncomment when you want to generate a salt for a new BusinessLogin
                //string tempGeneratedSalt = securityInstance.GenerateSalt(password);
                

                //Generates the hashed password value using the entered password and the stored salt
                HashedPassword = securityInstance.HashingCheckLogin(password, salt);

                //Checks the key value pair to see if the stored password value is the same as entered
                if (userList[username] == HashedPassword)
                {
                    string name = (string)tempTable.Rows[id - 1]["memberName"];
                    //Adding the entry to a list for the var to pull from. Allows proper setup of token
                    _users.Add(new MemberLogin { MemberId = id, MemberUsername = username, MemberPassword = HashedPassword, MemberName = name });

                }


            }

            var user = _users.SingleOrDefault(x => x.MemberUsername == username && x.MemberPassword == HashedPassword);

            if (user == null)
            {
                return null;
            }
            else
            {
                // Authentication successful so generate JWT Token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.MemberUsername.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                // Remove password before returning
                user.MemberPassword = null;
            }

            setMemberLoginData(tempTable, user.Token, user.MemberId);

            return user;

        } 

        public IEnumerable<MemberLogin> GetAll()
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
