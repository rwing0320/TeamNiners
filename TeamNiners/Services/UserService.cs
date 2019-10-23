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

    public class UserService : IUserService
    {

        //Sets up dependency injection to grab connectionString later
        private IConfiguration connectionString;


        public void SetupUserServiceConnection()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;
        }

        Dictionary<string, string> userList = new Dictionary<string, string>();

        /// <summary>
        /// Destroys the token and resets IsValid flag on clicking Logout button
        /// </summary>
        public BusinessLogin Logout(string email)
        {
            SetupUserServiceConnection();
            DataTable tempTable = new DataTable();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                tempTable = GetBusinessLoginData();


                SqlCommand command2 = new SqlCommand(
                    "UPDATE dbo.BusinessLogin SET token = '', IsValid = 0 WHERE email = '" + email + "';",
                    sqlConnection);

                command2.CommandType = CommandType.Text;

                adapter.UpdateCommand = command2;

                adapter.Update(tempTable);

                command2.ExecuteNonQuery();

                sqlConnection.Close();

            }

            return null;

        }

        /// <summary>
        /// Gets the UserID from the Database based on the email which will always be unique
        /// </summary>
        public int GetUserID(string email)
        {
            int id = 0;
            DataSet ds = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                   "SELECT id FROM dbo.BusinessLogin WHERE email = '" + email + "';",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.SelectCommand = command;

                command.ExecuteNonQuery();

                adapter.Fill(ds);

                if (ds.Tables[0].Rows.Count != 0)
                {

                    id = (int)ds.Tables[0].Rows[0]["ID"];

                }


                sqlConnection.Close();

            }

            return id;
        }


        /// <summary>
        /// Selects all of the data from the BusinessLogin table 
        /// and fills a DataTable with all of the row
        /// </summary>
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

        /// <summary>
        /// Sets the token and IsValid flag in the database for a specific user
        /// </summary>
        public void setBusinessLoginData(DataTable table, string token, int id)
        {
            DataTable tempTable = new DataTable();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("BusinessLogin", "Logins");

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                    "UPDATE dbo.BusinessLogin SET token = '" + token + "', IsValid = 1 WHERE id = " + id + ";",
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

                userList.Add((string)userDataTable.Rows[i]["email"], (string)userDataTable.Rows[i]["psswd"]);

            }

        }

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public BusinessLogin Authenticate(string username, string password, string storedSalt)
        {
            //Setting up necessary variables and a SecurityService instance to use hashing method
            var securityInstance = new SecurityService();
            DataTable tempTable;
            string HashedPassword = string.Empty;
            string salt = string.Empty;


            tempTable = GetBusinessLoginData();
            FillUserList(tempTable);

            //Gets the Salt & ID for the specific user
            int id = GetUserID(username);

            //Handles errors when the email is incorrect so that it won't break
            if (tempTable.Rows.Count != 0 && id != 0)
            {
                    salt = (string)tempTable.Rows[id - 1]["Salt"];
            }
            List<BusinessLogin> _users = new List<BusinessLogin>();

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
                    string name = (string)tempTable.Rows[id - 1]["BusinessName"];
                    //Adding the entry to a list for the var to pull from. Allows proper setup of token
                    _users.Add(new BusinessLogin { Id = id, Email = username, Psswd = HashedPassword, BusinessName = name });

                }


            }

            var user = _users.SingleOrDefault(x => x.Email == username && x.Psswd == HashedPassword);

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
                    new Claim(ClaimTypes.Name, user.Email.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                // Remove password before returning
                user.Psswd = null;
                user.Salt = salt;
            }

            setBusinessLoginData(tempTable, user.Token, user.Id);

            return user;

        }


        /// <summary>
        /// Allows the user or employee of a company reset their password on the dashboard.
        /// Will hash their old password input with the salt thats matching their email in database.
        /// Then generates a new salt and hash for the new password and inserts into database.
        /// </summary>
        public BusinessLogin ChangePassword(string oldPassword, string newPassword, string username, string salt)
        {

            DataTable tempTable = new DataTable();
            var securityInstance = new SecurityService();

            tempTable = GetBusinessLoginData();
            FillUserList(tempTable);

            string hashedInputPassword = securityInstance.HashingCheckLogin(oldPassword, salt);

            try
            {
                if (userList[username] == hashedInputPassword)
                {

                    string NewSalt = securityInstance.GenerateSalt(newPassword);
                    string setNewPassword = securityInstance.HashingCheckLogin(newPassword, NewSalt);


                    using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
                    {
                        SqlDataAdapter adapter = new SqlDataAdapter();

                        adapter.TableMappings.Add("BusinessLogin", "Logins");

                        sqlConnection.Open();

                        SqlCommand command = new SqlCommand(
                            "UPDATE dbo.BusinessLogin SET psswd = '" + setNewPassword + "', Salt = '" + NewSalt + "' WHERE email = '" + username + "';",
                            sqlConnection);

                        command.CommandType = CommandType.Text;

                        adapter.UpdateCommand = command;

                        adapter.Update(tempTable);

                        command.ExecuteNonQuery();

                        sqlConnection.Close();

                    }
                }
            }
            catch (Exception e)
            {
                return null;
            }

            Logout(username);

            return null;
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
