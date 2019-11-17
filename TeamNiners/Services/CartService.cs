using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TeamNiners.Interfaces;
using TeamNiners.Models;

namespace TeamNiners.Services
{
    public class CartService : ICartService
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

    
        public void DeleteCart(int id)
        {
            DataTable tempTable = new DataTable();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                adapter.TableMappings.Add("BusinessLogin", "Logins");

                sqlConnection.Open();

                SqlCommand command = new SqlCommand(
                    "DELETE FROM dbo.CartItems WHERE cartID ="  + id + ";",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.DeleteCommand = command;

                command.ExecuteNonQuery();

                sqlConnection.Close();


            }
        }
    }
}
