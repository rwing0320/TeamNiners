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

        public int gameId { get; set; }

        public int cartLineId { get; set; }

        private static IConfiguration connectionString;

        public static void SetupUserServiceConnection()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").SetBasePath(System.Environment.CurrentDirectory);
            var config = builder.Build();
            connectionString = config;
        }

        /// <summary>
        /// Retrieves the list of games that the business has posted.
        /// Uses the id stored in UserTempStorage in query to get games for logged in user
        /// </summary>
        public static List<ShowGameItem> GetGamesList(string filter)
        {
            SetupUserServiceConnection();
            int id = UserTempStorage.id;
            List<ShowGameItem> gamesList = new List<ShowGameItem>();

            DataSet ds = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                // Command will get all the games from GameInfo where GameInfo.GameID == BusinessGame.GameID 
                // AND BusinessGame.BusinessID == currently signed in ID
                SqlCommand filteredQueryCommand = new SqlCommand("");

                //The filter is handled by a select input on the show games page
                //Based on the value selected, different order bys will be used
                switch (filter)
                {
                    case "price_hl":

                        filteredQueryCommand = new SqlCommand("SELECT * FROM (" +
                       "SELECT GI.gameTitle, GI.gameDescription, GI.releaseDate, GI.gamePlatform, GI.gameCategory, GI.gamePrice," +
                       "BG.gameID, BG.businessID FROM dbo.GamingInfo GI " +
                       "JOIN dbo.BusinessGames BG ON GI.gameID = BG.gameID)" +
                       "BusinessInfo where BusinessInfo.businessID = '" + id + "' ORDER BY gamePrice desc;",
                        sqlConnection);

                        break;

                    case "price_lh":

                        filteredQueryCommand = new SqlCommand("SELECT * FROM (" +
                     "SELECT GI.gameTitle, GI.gameDescription, GI.releaseDate, GI.gamePlatform, GI.gameCategory, GI.gamePrice," +
                     "BG.gameID, BG.businessID FROM dbo.GamingInfo GI " +
                     "JOIN dbo.BusinessGames BG ON GI.gameID = BG.gameID)" +
                     "BusinessInfo where BusinessInfo.businessID = '" + id + "' ORDER BY gamePrice asc;",
                      sqlConnection);

                        break;

                    case "name_desc":

                        filteredQueryCommand = new SqlCommand("SELECT * FROM (" +
                     "SELECT GI.gameTitle, GI.gameDescription, GI.releaseDate, GI.gamePlatform, GI.gameCategory, GI.gamePrice," +
                     "BG.gameID, BG.businessID FROM dbo.GamingInfo GI " +
                     "JOIN dbo.BusinessGames BG ON GI.gameID = BG.gameID)" +
                     "BusinessInfo where BusinessInfo.businessID = '" + id + "' ORDER BY gameTitle asc;",
                      sqlConnection);

                        break;

                    case "name_asc":

                        filteredQueryCommand = new SqlCommand("SELECT * FROM (" +
                     "SELECT GI.gameTitle, GI.gameDescription, GI.releaseDate, GI.gamePlatform, GI.gameCategory, GI.gamePrice," +
                     "BG.gameID, BG.businessID FROM dbo.GamingInfo GI " +
                     "JOIN dbo.BusinessGames BG ON GI.gameID = BG.gameID)" +
                     "BusinessInfo where BusinessInfo.businessID = '" + id + "' ORDER BY gameTitle desc;",
                      sqlConnection);

                        break;
                }

                filteredQueryCommand.CommandType = CommandType.Text;

                adapter.SelectCommand = filteredQueryCommand;

                filteredQueryCommand.ExecuteNonQuery();

                adapter.Fill(ds);

                sqlConnection.Close();

            }

            //Iterating through and mapping table values to object properties before adding to list
            foreach (DataTable dt in ds.Tables)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    ShowGameItem tempGame = new ShowGameItem();
                    tempGame.gameId = (int)dr["gameID"];
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

        public static List<ShowGameItem> GetGamesListForWishList()
        {
            SetupUserServiceConnection();
           // int id = UserTempStorage.id;

            int wishListId = UserTempStorage.wishID;
            List<ShowGameItem> gamesList = new List<ShowGameItem>();

            DataSet ds2 = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                // Command will get all the games from GameInfo where GameInfo.GameID == BusinessGame.GameID 
                // AND BusinessGame.BusinessID == currently signed in ID
                SqlCommand filteredQueryCommand = new SqlCommand("");

                filteredQueryCommand = new SqlCommand("SELECT * FROM(" +
                "SELECT wish.id,wish.wishListId, game.gameID, game.gameTitle, game.gameDescription, game.gamePlatform, game.gameCategory, game.gamePrice, game.releaseDate " +
                "FROM WishListItems wish " +
                "INNER JOIN GamingInfo game ON game.gameID = wish.ProductId) myresult " +
                "WHERE myResult.wishListId = " + wishListId + " ;",
                    sqlConnection);


             ;


                filteredQueryCommand.CommandType = CommandType.Text;

                adapter.SelectCommand = filteredQueryCommand;

                filteredQueryCommand.ExecuteNonQuery();

                adapter.Fill(ds2);

                sqlConnection.Close();

            }

            //Iterating through and mapping table values to object properties before adding to list
            foreach (DataTable dt in ds2.Tables)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    ShowGameItem tempGame = new ShowGameItem();
                    
                    tempGame.gameId = (int)dr["gameID"];
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

        public static List<ShowGameItem> GetGamesListForCart()
        {
            SetupUserServiceConnection();
            // int id = UserTempStorage.id;

            int cartId = UserTempStorage.cartID;
            List<ShowGameItem> gamesList = new List<ShowGameItem>();

            DataSet ds3 = new DataSet();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString.GetSection("ConnectionStrings").GetSection("NinersConnection").Value))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();

                sqlConnection.Open();

                // Command will get all the games from GameInfo where GameInfo.GameID == BusinessGame.GameID 
                // AND BusinessGame.BusinessID == currently signed in ID
                SqlCommand filteredQueryCommand = new SqlCommand("");

                filteredQueryCommand = new SqlCommand("SELECT* FROM(" +
                    "SELECT cart.cartItemdID,cart.cartID, game.gameID, game.gameTitle, game.gameDescription, game.gamePrice " +
                    "FROM CartItems cart " +
                    "INNER JOIN GamingInfo game ON game.gameID = cart.gameID) resultSet " +
                    "WHERE resultSet.cartID = " + cartId + ";",
                    sqlConnection);


               


                filteredQueryCommand.CommandType = CommandType.Text;

                adapter.SelectCommand = filteredQueryCommand;

                filteredQueryCommand.ExecuteNonQuery();

                adapter.Fill(ds3);

                sqlConnection.Close();

            }

            //Iterating through and mapping table values to object properties before adding to list
            foreach (DataTable dt in ds3.Tables)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    ShowGameItem tempGame = new ShowGameItem();
                    tempGame.cartLineId = (int)dr["cartItemdID"];
                    tempGame.gameId = (int)dr["gameID"];
                    tempGame.Title = (string)dr["gameTitle"];
                    tempGame.Description = (string)dr["gameDescription"];
                    tempGame.Price = (Int64)dr["gamePrice"];
                    gamesList.Add(tempGame);
                }
            }

            return gamesList;
        }

    }

}

