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
        public string Category { get; set; }
        public Int64 Price { get; set; }


        private IConfiguration connectionString;

        public void SetupUserServiceConnection()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;
        }
        
        /// <summary>
        /// Retrieves the list of games that the business has posted.
        /// Uses the id stored in UserTempStorage in query to get games for logged in user
        /// </summary>
        public List<ShowGameItem> GetGamesList()
        {
            SetupUserServiceConnection();
            int id = UserTempStorage.id;
            List<ShowGameItem> gamesList = new List<ShowGameItem>();

            DataSet ds = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                //Get all the games from GameInfo where GameInfo.GameID == BusinessGame.GameID 
                // AND BusinessGame.BusinessID == currently signed in ID
                SqlCommand command = new SqlCommand(
                   "SELECT * FROM (" +
                   "SELECT GI.gameTitle, GI.gameDescription, GI.releaseDate, GI.gamePlatform, GI.gameCategory, GI.gamePrice," +
                   "BG.gameID, BG.businessID FROM dbo.GamingInfo GI " +
                   "JOIN dbo.BusinessGames BG ON GI.gameID = BG.gameID)" +
                   "BusinessInfo where BusinessInfo.businessID = '" + id + "';",
                    sqlConnection);

                command.CommandType = CommandType.Text;

                adapter.SelectCommand = command;

                command.ExecuteNonQuery();

                adapter.Fill(ds);

                sqlConnection.Close();

            }

            //Iterating through and mapping table values to object properties before adding to list
            foreach (DataTable dt in ds.Tables)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    ShowGameItem tempGame = new ShowGameItem();
                    tempGame.Title = (string)dr["gameTitle"];
                    tempGame.Description = (string)dr["gameDescription"];
                    tempGame.releaseDate = (DateTime)dr["releaseDate"];
                    tempGame.Platform = EnumParser.GetEnumValue((int)dr["gamePlatform"], "Platform");
                    tempGame.Category = EnumParser.GetEnumValue((int)dr["gameCategory"], "Category");
                    tempGame.Price = (Int64)dr["gamePrice"];
                    gamesList.Add(tempGame);
                }
            }

            return gamesList;
        }

    }




}
