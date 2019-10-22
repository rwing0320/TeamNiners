using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace TeamNiners.Helpers
{
    public class ShowGameItem
    { 
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime releaseDate { get; set; }
        public string Platform { get; set; }
        public double Price { get; set; }


        private IConfiguration connectionString;

        public void SetupUserServiceConnection()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;
        }

        public List<ShowGameItem> GetGamesList()
        {
            List<ShowGameItem> gamesList = new List<ShowGameItem>();

            DataSet ds = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                //Get all the games from GameInfo where GameInfo.GameID == BusinessGame.GameID 
                // AND BusinessGame.BusinessID == currently signed in ID
                SqlCommand command = new SqlCommand(
                   "SELECT id FROM dbo.BusinessLogin WHERE email = '" + "" + "';",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.SelectCommand = command;

                command.ExecuteNonQuery();

                adapter.Fill(ds);

                //id = (int)ds.Tables[0].Rows[0]["ID"];

                sqlConnection.Close();

            }

            return gamesList;
        }

    }




}
