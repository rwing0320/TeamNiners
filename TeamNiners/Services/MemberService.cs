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
        int tempTablePos = 0;


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
            SetupUserServiceConnection();
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

                if (ds.Tables[0].Rows.Count != 0)
                {
                    id = (int)ds.Tables[0].Rows[0]["memberID"];

                }

                sqlConnection.Close();

            }

            return id;
        }


        public MemberLogin createAccount(MemberLogin memberLogin)
        {
            //DataTable tempTable = new DataTable();
            SetupUserServiceConnection();

            var securityInstance = new SecurityService();

            MemberLogin login = new MemberLogin();
            login.MemberPassword = memberLogin.MemberPassword;
            login.MemberId = memberLogin.MemberId;
            login.MemberUsername = memberLogin.MemberUsername;
            login.MemberName = memberLogin.MemberName;

            string salt = securityInstance.GenerateSalt(login.MemberPassword);
            //tempTable = GetBusinessLoginData();
            //FillUserList(tempTable);

            login.Salt = salt;

            string hashedInputPassword = securityInstance.HashingCheckLogin(login.MemberPassword, salt);

            login.MemberPassword = hashedInputPassword;

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("BusinessLogin", "Logins");

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                    "INSERT INTO dbo.MemberLogin VALUES(" + login.MemberId  + ",'" + login.MemberUsername +  "','" + login.MemberPassword + "'," + 0 +",'" + login.MemberName + "','NULL','" + salt + "');",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.InsertCommand = command;

                //adapter.Insert(tempTable);

                command.ExecuteNonQuery();

                sqlConnection.Close();

            }

            //_context.MemberLogin.Add(login);
            //_context.SaveChanges();

            AuthenticateNewUser(login);
            //Logout(username);

            return login;
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

            SetupUserServiceConnection();

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


        public MemberLogin AuthenticateNewUser(MemberLogin login)
        {
            //Setting up necessary variables and a SecurityService instance to use hashing method
            var securityInstance = new SecurityService();
            DataTable tempTable = new DataTable();
            string HashedPassword = login.MemberPassword;
            string salt = login.Salt;
            

         
            // Authentication successful so generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, login.MemberUsername.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            login.Token = tokenHandler.WriteToken(token);

            UserTempStorage.memberID = login.MemberId;
            UserTempStorage.email = login.MemberUsername;
            UserTempStorage.salt = salt;

            // Remove password before returning
            login.MemberPassword = null;


            

            setMemberLoginData(tempTable, login.Token, login.MemberId);

            return login;

        }
        public MemberLogin Authenticate(string username, string password, string storedSalt)
        {

            SetupUserServiceConnection();

            //Setting up necessary variables and a SecurityService instance to use hashing method
            var securityInstance = new SecurityService();
            DataTable tempTable;
            string HashedPassword = string.Empty;
            string salt = string.Empty;


            tempTable = GetMemberLoginData();
            FillUserList(tempTable);

            //Gets the Salt & ID for the specific user
            int id = GetMemberID(username);


            //Handles errors when the email is incorrect so that it won't break
            if (tempTable.Rows.Count != 0 && id != 0)
            {
                for(var i = 0; i < tempTable.Rows.Count; i++)
                {
                    if(tempTable.Rows[i]["memberID"].ToString() == id.ToString())
                    {
                        salt = (string)tempTable.Rows[i]["Salt"];
                        tempTablePos = i;
                        break;
                    }
                }
                //salt = (string)tempTable.Rows[id - 1]["Salt"];
                //salt = (string)tempTable.Rows[id-1]["Salt"];

                //salt = (string)tempTable.Rows["memberID"][]

            }

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
                    //string name = (string)tempTable.Rows[id - 1]["memberName"];
                    string name = (string)tempTable.Rows[tempTablePos]["memberName"];
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

                UserTempStorage.email = username;
                UserTempStorage.salt = salt;

                // Remove password before returning
                user.MemberPassword = null;
            }

            setMemberLoginData(tempTable, user.Token, user.MemberId);

            return user;

        }


        public MemberLogin ChangePassword(string oldPassword, string newPassword, string username, string salt)
        {

            DataTable tempTable = new DataTable();
            var securityInstance = new SecurityService();

            tempTable = GetMemberLoginData();
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
                            "UPDATE dbo.MemberLogin SET memberPassword = '" + setNewPassword + "', Salt = '" + NewSalt + "' WHERE memberUsername = '" + username + "';",
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

            //Logout(username);

            return null;
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
